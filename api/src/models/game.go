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

	CreatedAt time.Time
	UpdatedAt time.Time
    DeletedAt *gorm.DeletedAt `gorm:"index"`
}
