package logOutput

import (
	"fmt"
	"os"
	"slices"
	"strings"
)

type CsvOutput struct {
	fileName              string
	fieldsToSkip          []string
	fieldIndexesToSkip    []int
	fieldsCondition       []string
	fieldIndexesCondition []int
}

func New(fileName string, fieldsToSkip []string, fieldsCondition []string) *CsvOutput {
	return &CsvOutput{
		fileName:        fileName,
		fieldsToSkip:    fieldsToSkip,
		fieldsCondition: fieldsCondition,
	}
}

func (l *CsvOutput) AppendHead(headFields []string) {
	l.fieldIndexesToSkip = getFieldIndexes(headFields, l.fieldsToSkip...)
	l.fieldIndexesCondition = getFieldIndexes(headFields, l.fieldsCondition...)
	headFields = removeIdexes(headFields, l.fieldIndexesToSkip)
	if fileIsEmptyOrNotExists(l.fileName) {
		appendToFile(l.fileName, fmt.Sprintf("%s\n", strings.Join(headFields, ",")))
	}
}

func (l *CsvOutput) AppendLine(lineOfValues []string, condition func(map[string]string) bool) error {
	fieldsToVerify := map[string]string{}
	for idx, idxOfField := range l.fieldIndexesCondition {
		if len(lineOfValues) > idxOfField {
			fieldsToVerify[l.fieldsCondition[idx]] = lineOfValues[idxOfField]
		}
	}
	if !condition(fieldsToVerify) {
		return nil
	}

	lineOfValues = removeIdexes(lineOfValues, l.fieldIndexesToSkip)
	for i, value := range lineOfValues {
		if strings.Contains(value, ",") {
			lineOfValues[i] = fmt.Sprintf("\"%s\"", value)
		}
	}
	lineString := fmt.Sprintln(strings.Join(lineOfValues, ","))
	if len(lineString) <= 1 {
		return nil
	}
	if err := appendToFile(l.fileName, lineString); err != nil {
		return fmt.Errorf("Failed to open file: %s", err)
	}
	return nil
}

func appendToFile(fileName string, line string) error {
	file, err := os.OpenFile(fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("Failed to open file: %s", err)
	}
	defer file.Close()

	if _, err := file.WriteString(line); err != nil {
		return fmt.Errorf("Failed to write in file: %s", err)
	}
	return nil
}

func fileIsEmptyOrNotExists(fileName string) bool {
	file, err := os.Open(fileName)
	if err != nil {
		return true
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return true
	}

	return stat.Size() == 0
}

func getFieldIndexes(fields []string, fieldNames ...string) []int {
	positions := []int{}
	for i, field := range fields {
		if slices.Contains(fieldNames, field) {
			positions = append(positions, i)
		}
	}
	return positions
}

func SkipLines[T any](lines [][]T, indexField int, condition func(T) bool) [][]T {
	filteredLines := [][]T{}
	for _, line := range lines {
		if !condition(line[indexField]) {
			filteredLines = append(filteredLines, line)
		}
	}
	return filteredLines
}

func removeIdexes[T any](line []T, indexesToFilter []int) []T {
	filteredLine := []T{}
	for i, value := range line {
		if !slices.Contains(indexesToFilter, i) {
			filteredLine = append(filteredLine, value)
		}
	}
	return filteredLine
}
