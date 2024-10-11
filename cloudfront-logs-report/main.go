package main

import (
	"compress/gzip"
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"

	"io"
)

func main() {
	ctx := context.Background()
	sdkConfig, err := config.LoadDefaultConfig(ctx, config.WithRegion("eu-west-1"))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	s3Client := s3.NewFromConfig(sdkConfig)
	listObjectVersionsInput := s3.ListObjectsV2Input{
		Bucket: aws.String("angeloceccato-website-logs"),
		Prefix: aws.String("angeloceccato-website-content/"),
	}
	result, err := s3Client.ListObjectsV2(ctx, &listObjectVersionsInput)
	for _, content := range result.Contents {

		getObjectInput := s3.GetObjectInput{
			Bucket: aws.String("angeloceccato-website-logs"),
			Key:    content.Key,
		}
		result, err := s3Client.GetObject(ctx, &getObjectInput)
		if err != nil {
			fmt.Printf("Couldn't list buckets for your account. Here's why: %v\n", err)
			return
		}
		defer result.Body.Close()
		fmt.Printf("\t%s\n", gzipDecode(result.Body))
	}
}

func gzipDecode(reader io.Reader) string {
	gzreader, e1 := gzip.NewReader(reader)
	if e1 != nil {
		fmt.Println(e1) // Maybe panic here, depends on your error handling.
	}

	output, e2 := io.ReadAll(gzreader)
	if e2 != nil {
		fmt.Println(e2)
	}

	return string(output)
}
