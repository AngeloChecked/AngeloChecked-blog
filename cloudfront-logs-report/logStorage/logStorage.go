package logStorage

import (
	"compress/gzip"
	"context"
	"fmt"
	"io"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type LogStorage struct {
	s3     *s3.Client
	ctx    context.Context
	bucket string
	folder string
}

func New() *LogStorage {
	ctx := context.Background()
	sdkConfig, err := config.LoadDefaultConfig(ctx, config.WithRegion("eu-west-1"))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	s3Client := s3.NewFromConfig(sdkConfig)
	return &LogStorage{
		s3:     s3Client,
		ctx:    ctx,
		bucket: "angeloceccato-website-logs",
		folder: "angeloceccato-website-content/",
	}
}

func (logStorage *LogStorage) AllLogFiles() ([]string, error) {
	listObjectVersionsInput := s3.ListObjectsV2Input{
		Bucket: aws.String(logStorage.bucket),
		Prefix: aws.String(logStorage.folder),
	}
	result, err := logStorage.s3.ListObjectsV2(logStorage.ctx, &listObjectVersionsInput)
	if err != nil {
		return nil, err
	}
	keys := []string{}
	for _, content := range result.Contents {
		keys = append(keys, aws.ToString(content.Key))
	}
	return keys, nil
}

func (logStorage *LogStorage) DownloadLogFile(key string) (string, error) {
	getObjectInput := s3.GetObjectInput{
		Bucket: aws.String(logStorage.bucket),
		Key:    aws.String(key),
	}
	result, err := logStorage.s3.GetObject(logStorage.ctx, &getObjectInput)
	if err != nil {
		return "", err
	}
	defer result.Body.Close()
	return gzipDecode(result.Body), nil
}

func gzipDecode(reader io.Reader) string {
	gzreader, e1 := gzip.NewReader(reader)
	if e1 != nil {
		fmt.Println(e1)
	}

	output, e2 := io.ReadAll(gzreader)
	if e2 != nil {
		fmt.Println(e2)
	}

	return string(output)
}
