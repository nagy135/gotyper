package utils

import (
	"math/rand"
	"time"
    "strings"
)

func RandomText(length int) string {
	text := ""
	for i := 1; i < length; i++ {
		text = text + " " + RandSeq(5)
	}
    return strings.TrimSpace(text)
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandSeq(n int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
