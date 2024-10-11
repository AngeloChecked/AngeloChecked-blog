package logshape

import (
	"strings"
)

type Log struct {
	Fields []string
}

func LogFormatter(logs string) Log {
	lines := strings.Split(logs, "\n")
	lines = lines[1:]
	fieldsLineSplited := strings.Split(lines[0], "#Fields: ")
	fieldsLine := fieldsLineSplited[1]
	fields := strings.Split(fieldsLine, " ")
	//fmt.Println(strings.Join(fields, ","))
	return Log{Fields: fields}
}
