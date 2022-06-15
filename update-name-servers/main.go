package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/acm"
	acmtypes "github.com/aws/aws-sdk-go-v2/service/acm/types"
	"github.com/aws/aws-sdk-go-v2/service/route53"
	route53types "github.com/aws/aws-sdk-go-v2/service/route53/types"
	"github.com/aws/aws-sdk-go-v2/service/route53domains"
	"github.com/aws/aws-sdk-go-v2/service/route53domains/types"
	"github.com/aws/aws-sdk-go/aws"
)

type hostedZoneData struct {
	Name                   string
	Id                     string
	ResourceRecordSetCount string
}

type certificateData struct {
	DomainValidationOptions []acmtypes.DomainValidation
	DomainName              string
}

func main() {
	argsWithoutProg := os.Args[1]
	fmt.Println(argsWithoutProg)
	if argsWithoutProg == "delete-certificates" {
		DeleteCertificates()
	}

	if argsWithoutProg == "describe-certificates" {
		DescribeCertificates()
	}

	if argsWithoutProg == "create-certificate-records" {
		UpdateDnsRecords()
	}

	if argsWithoutProg == "request-certificate" {
		RequestCertificate()
	}

	if argsWithoutProg == "aling-domain-names" {
		hostedDatas := getHostedZoneData()
		fmt.Printf("%+v\n", hostedDatas)

		for _, hostedData := range hostedDatas {
			nameservers := getNameservers(&hostedData.Id)
			updateDomainNameservers(&hostedData.Name, nameservers)
		}

		domains := getDomains()
		fmt.Printf("%s\n", domains)
	}

}

func DeleteCertificates() {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	acmClient := acm.NewFromConfig(route53cfg)
	response, err := acmClient.ListCertificates(context.TODO(), &acm.ListCertificatesInput{})
	if err != nil {
		log.Fatal(err)
	}
	for _, certificateSummary := range response.CertificateSummaryList {
		response, err := acmClient.DescribeCertificate(context.TODO(), &acm.DescribeCertificateInput{
			CertificateArn: certificateSummary.CertificateArn,
		})
		if err != nil {
			log.Fatal(err)
		}
		PrintJSON(response)

		question := StringPrompt("are you sure to destroy this certificate? (y/n)")
		if question != "y" {
			fmt.Println("skipped")
			continue
		}

		deleteResponse, deleteError := acmClient.DeleteCertificate(context.TODO(), &acm.DeleteCertificateInput{
			CertificateArn: certificateSummary.CertificateArn,
		})
		if deleteError != nil {
			log.Fatal(deleteError)
		}
		PrintJSON(deleteResponse)
	}

}

func DescribeCertificates() []certificateData {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	acmClient := acm.NewFromConfig(route53cfg)
	response, err := acmClient.ListCertificates(context.TODO(), &acm.ListCertificatesInput{})
	if err != nil {
		log.Fatal(err)
	}
	certificateDatas := []certificateData{}
	for _, certificateSummary := range response.CertificateSummaryList {
		response, err := acmClient.DescribeCertificate(context.TODO(), &acm.DescribeCertificateInput{
			CertificateArn: certificateSummary.CertificateArn,
		})
		if err != nil {
			log.Fatal(err)
		}
		PrintJSON(response)
		certificateDatas = append(certificateDatas, certificateData{
			DomainName:              *response.Certificate.DomainName,
			DomainValidationOptions: response.Certificate.DomainValidationOptions,
		})
	}
	PrintJSON(certificateDatas)
	return certificateDatas
}

func UpdateDnsRecords() {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	route53Client := route53.NewFromConfig(route53cfg)

	hostedDatas := getHostedZoneData()
	certificateDatas := DescribeCertificates()
	if len(certificateDatas) == 0 {
		fmt.Println("abort: no certificate data")
		return
	}

	for _, hostedData := range hostedDatas {
		changes := []route53types.Change{}

		var rightCertificateData *certificateData
		for _, certificateData := range certificateDatas {
			if certificateData.DomainName == hostedData.Name {
				rightCertificateData = &certificateData
				break
			}
		}

		if rightCertificateData == nil {
			fmt.Println("abort: certificate domain not present")
			return
		}

	loop:
		for _, domainValidationOptions := range rightCertificateData.DomainValidationOptions {
			recordName := *domainValidationOptions.ResourceRecord.Name

			change := route53types.Change{
				Action: "UPSERT",
				ResourceRecordSet: &route53types.ResourceRecordSet{
					Name: &recordName,
					Type: route53types.RRType(domainValidationOptions.ResourceRecord.Type),
					ResourceRecords: []route53types.ResourceRecord{
						{
							Value: domainValidationOptions.ResourceRecord.Value,
						},
					},
					TTL: aws.Int64(60),
				},
			}
			for _, c := range changes {
				if *c.ResourceRecordSet.Name == recordName {
					fmt.Println("change skipped: " + *c.ResourceRecordSet.Name + " == " + recordName)
					continue loop
				}
			}

			changes = append(changes, change)
		}

		fmt.Println("###")
		fmt.Println(hostedData.Name + " Host changes:")
		PrintJSON(changes)
		question := StringPrompt("are you sure for this changes? (y/n)")
		if question != "y" {
			fmt.Println("skip")
			continue
		}

		params := &route53.ChangeResourceRecordSetsInput{
			ChangeBatch:  &route53types.ChangeBatch{Changes: changes},
			HostedZoneId: aws.String(hostedData.Id),
		}

		response, err := route53Client.ChangeResourceRecordSets(context.TODO(), params)
		if err != nil {
			log.Fatal(err)
		}
		PrintJSON(response)
	}
}

func StringPrompt(label string) string {
	var s string
	r := bufio.NewReader(os.Stdin)
	for {
		fmt.Fprint(os.Stderr, label+" ")
		s, _ = r.ReadString('\n')
		if s != "" {
			break
		}
	}
	return strings.TrimSpace(s)
}

/*
func RequestCertificate() {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	acmClient := acm.NewFromConfig(route53cfg)

	domains := getDomains()
	for _, domain := range domains {
		domainName := domain
		domainNames := []string{"*." + domain}

	}

	params := acm.RequestCertificateInput{
		DomainName:              &domainName,
		SubjectAlternativeNames: domainNames,
		ValidationMethod:        "DNS",
	}

	PrintJSON(params)
	question := StringPrompt("are you sure create this certificate configurations? (y/n)")
	if question != "y" {
		fmt.Println("skip")
		continue
	}

	response, err := acmClient.RequestCertificate(context.TODO(), &params)
	if err != nil {
		log.Fatal(err)
	}
	PrintJSON(response)

}
*/

func RequestCertificate() {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	acmClient := acm.NewFromConfig(route53cfg)

	domains := getDomains()
	for _, domain := range domains {
		domainName := domain
		domainNames := []string{"*." + domain}

		params := acm.RequestCertificateInput{
			DomainName:              &domainName,
			SubjectAlternativeNames: domainNames,
			ValidationMethod:        "DNS",
		}

		PrintJSON(params)
		question := StringPrompt("are you sure create this certificate configurations? (y/n)")
		if question != "y" {
			fmt.Println("skip")
			continue
		}

		response, err := acmClient.RequestCertificate(context.TODO(), &params)
		if err != nil {
			log.Fatal(err)
		}
		PrintJSON(response)

	}

}

func updateDomainNameservers(domainName *string, nameservers []string) {
	domainsCfg, err := config.LoadDefaultConfig(context.TODO(), config.WithSharedConfigProfile("route53profile"), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	domainsClient := route53domains.NewFromConfig(domainsCfg)
	_ = domainsClient

	var inputNameservers []types.Nameserver
	for _, name := range nameservers {
		name := name
		nameserver := &types.Nameserver{Name: &name}
		inputNameservers = append(inputNameservers, *nameserver)
	}
	PrintJSON(inputNameservers)

	params := &route53domains.UpdateDomainNameserversInput{DomainName: domainName, Nameservers: inputNameservers}
	domainsResp, err := domainsClient.UpdateDomainNameservers(context.TODO(), params)
	if err != nil {
		log.Fatal(err)
	}

	PrintJSON(domainsResp)
}

func getNameservers(hostedZoneId *string) []string {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	route53Client := route53.NewFromConfig(route53cfg)
	params := &route53.GetHostedZoneInput{Id: hostedZoneId}
	hostedZonesResp, err := route53Client.GetHostedZone(context.TODO(), params)
	if err != nil {
		log.Fatal(err)
	}

	return hostedZonesResp.DelegationSet.NameServers
}

func getHostedZoneData() []hostedZoneData {
	route53cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	route53Client := route53.NewFromConfig(route53cfg)
	hostedZonesResp, err := route53Client.ListHostedZones(context.TODO(), &route53.ListHostedZonesInput{})
	if err != nil {
		log.Fatal(err)
	}
	var hostedDatas []hostedZoneData
	for _, hostedZone := range hostedZonesResp.HostedZones {
		if *hostedZone.ResourceRecordSetCount > 2 {
			stringNum := strconv.FormatInt(*hostedZone.ResourceRecordSetCount, 10)
			hostedZoneName := *hostedZone.Name
			hostedData := hostedZoneData{Name: hostedZoneName[0 : len(hostedZoneName)-1], Id: *hostedZone.Id, ResourceRecordSetCount: stringNum}
			hostedDatas = append(hostedDatas, hostedData)
		}
	}
	return hostedDatas
}

func getDomains() []string {
	domainsCfg, err := config.LoadDefaultConfig(context.TODO(), config.WithSharedConfigProfile("route53profile"), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatal(err)
	}
	domainsClient := route53domains.NewFromConfig(domainsCfg)
	domainsResp, err := domainsClient.ListDomains(context.TODO(), &route53domains.ListDomainsInput{})
	if err != nil {
		log.Fatal(err)
	}

	var domains []string
	for _, domain := range domainsResp.Domains {
		domains = append(domains, *domain.DomainName)
	}
	return domains
}

func PrintJSON(obj interface{}) {
	bytes, _ := json.MarshalIndent(obj, "\t", "\t")
	fmt.Println(string(bytes))
}
