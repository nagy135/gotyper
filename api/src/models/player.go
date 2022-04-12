package models

import (
	"time"
	"gorm.io/gorm"
)

/// Player in given temporary game
type Player struct {
	ID uint `gorm:"primaryKey"`

	Name string
	Progress int

    GameID int
    Game Game

	CreatedAt time.Time
	UpdatedAt time.Time
    DeletedAt *gorm.DeletedAt `gorm:"index"`
}
