package main

import (
	"fmt"
	"log"
	"strings"

	"github.com/angelochecked/cloudfront-logs-report/v2/logOutput"
	"github.com/angelochecked/cloudfront-logs-report/v2/logStorage"
	"github.com/angelochecked/cloudfront-logs-report/v2/logshape"
)

func main() {
	logStorage := logStorage.New()
	logOutput := logOutput.New("output.csv", []string{
		"sc-bytes",
		"cs(Host)",
		"cs-method",
		"cs-uri-query",
		"cs(Cookie)",
		"x-edge-request-id",
		"x-forwarded-for",
		"fle-status",
		"fle-encrypted-fields",
		"sc-content-len",
		"ssl-protocol",
		"ssl-cipher",
		"x-edge-response-result-type",
		"cs-protocol-version",
		"c-port",
		"time-to-first-byte",
		"x-edge-detailed-result-type",
		"sc-range-start",
		"sc-range-end",
		"cs-bytes",
	},
		[]string{
			"cs-uri-stem",
			"sc-status",
		},
	)

	allLogFiles, err := logStorage.AllLogFiles()
	if err != nil {
		log.Fatalf("Failed to get logs: %s", err)
	}

	for _, logFile := range allLogFiles {
		logFile, _ := logStorage.DownloadLogFile(logFile)
		parsedLog := logshape.LogParse(logFile)

		logOutput.AppendHead(parsedLog.Fields)

		for _, line := range parsedLog.Values {
			if err = logOutput.AppendLine(
				line,
				func(m map[string]string) bool {
					fmt.Println(m["cs-uri-stem"])
					if m["sc-status"] == "404" {
						return false
					}
					if m["sc-status"] == "301" {
						return false
					}
					if strings.Contains(m["cs-uri-stem"], "/img/") {
						return false
					}
					if m["cs-uri-stem"] == "/robots.txt" {
						return false
					}
					if m["cs-uri-stem"] == "/favicon.ico" {
						return false
					}
					if strings.Contains(m["cs-uri-stem"], ".php") {
						return false
					}
					return true
				},
			); err != nil {
				fmt.Println(fmt.Sprintf("Failed to write line: %s", err))
			}
		}
	}
}
