package logshape

import (
	"strings"
)

type Log struct {
	Fields []string
	Values [][]string
}

func LogParse(logs string) Log {
	stringLines := strings.Split(logs, "\n")
	stringLines = stringLines[1:]
	fieldsStringLineSplited := strings.Split(stringLines[0], "#Fields: ")
	fieldsStringLine := fieldsStringLineSplited[1]
	fieldsFirstLine := strings.Split(fieldsStringLine, " ")

	stringLinesWithValues := stringLines[1:]
	valuesPerLine := [][]string{}
	for _, line := range stringLinesWithValues {
		valuesPerLine = append(valuesPerLine, strings.Split(line, "\t"))
	}

	return Log{
		Fields: fieldsFirstLine,
		Values: valuesPerLine,
	}
}
