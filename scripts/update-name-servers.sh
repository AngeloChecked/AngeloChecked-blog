AWS_PROFILE=route53profile

DOMAINS=$(aws route53domains --region=us-east-1 list-domains | jq -r .Domains[].DomainName)
echo domains profile: $AWS_PROFILE
echo domains: $DOMAINS


for DOMAIN in $DOMAINS 
do
echo $DOMAIN
NAMESERVERS=$(aws route53domains get-domain-detail --region=us-east-1 --domain-name=$DOMAIN | jq -r .Nameservers[].Name)
echo old name servers: ${NAMESERVERS[0]} ${NAMESERVERS[1]} ${NAMESERVERS[2]} ${NAMESERVERS[3]}

AWS_PROFILE=default
echo new name servers:
echo $(aws route53 list-hosted-zones | jq -r ".HostedZones[] | select(.ResourceRecordSetCount>2) .Id")

exit
AWS_PROFILE=route53profile
OPERATION_ID=aws route53domains update-domain-nameservers \
    --region us-east-1 \
    --domain-name $DOMAIN \
    --nameservers Name=${NAMESERVERS[0]} Name=${NAMESERVERS[1]} Name=${NAMESERVERS[2]} Name=${NAMESERVERS[3]} \
        | jq -r .OperationId
echo operation: $OPERATION_ID
done

exit 

RESULT=$(update_nameservers)
echo $RESULT
OP=$(RESULT | jq ".operationId")
echo $OP

