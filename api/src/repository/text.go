package repository

import (
	"gotyper/src/models"
	"gotyper/src/utils"

	"github.com/jinzhu/gorm"
)

func TextCreate(db *gorm.DB) (*models.Text, error) {
	text := &models.Text{
		Name: "Text-" + utils.RandSeq(10),
		Text: utils.RandomText(10),
	}

	if err := db.Create(&text).Error; err != nil {
		return nil, err
	}
	return text, nil
}
