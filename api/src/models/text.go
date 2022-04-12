package models

import (
	"time"
	"gorm.io/gorm"
)

type Text struct {
	ID uint `gorm:"primaryKey"`

	Text string `gorm:"type:text"`
	Name string

	CreatedAt time.Time
	UpdatedAt time.Time
    DeletedAt *gorm.DeletedAt `gorm:"index"`
}
