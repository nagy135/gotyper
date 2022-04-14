package models

import (
	"time"
	"gorm.io/gorm"
)

type Game struct {
	ID uint `gorm:"primaryKey"`

	Name string
    Done bool `gorm:"defult:false"`

    Players []Player

    TextID int
    Text Text

	CreatedAt time.Time
	UpdatedAt time.Time
    DeletedAt *gorm.DeletedAt `gorm:"index"`
}
