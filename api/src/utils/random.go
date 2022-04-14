package utils
import (
    "math/rand"
    "time"
    "github.com/brianvoe/gofakeit/v6"
    "strings"
)

type FakerSetup struct {
    // Str      string
    // Int      int
    // Pointer  *int
    // Name     string         `fake:"{firstname}"`         // Any available function all lowercase
    Sentence string         `fake:"{sentence:7}"`        // Can call with parameters
    // RandStr  string         `fake:"{randomstring:[hello,world]}"`
    // Number   string         `fake:"{number:1,10}"`       // Comma separated for multiple values
    // Regex    string         `fake:"{regex:[abcdef]{5}}"` // Generate string from regex
    // Map      map[string]int `fakesize:"2"`
    // Array    []string       `fakesize:"2"`
    // Bar 	 Bar
    // Skip     *string        `fake:"skip"`                // Set to "skip" to not generate data for
    // Created  time.Time								     // Can take in a fake tag as well as a format tag
    // CreatedFormat  time.Time `fake:"{year}-{month}-{day}" format:"2006-01-02"`
}


func RandomText(sentences int) string {
    var f FakerSetup
    sentence := ""
    for i := 0; i < sentences; i++ {
        gofakeit.Struct(&f)

        sentence += f.Sentence + " "
    }
    return strings.TrimSpace(sentence)
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
