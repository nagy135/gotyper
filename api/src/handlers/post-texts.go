package handlers

import (
	"gotyper/src/models"
	"gotyper/src/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func PostTexts(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		text := models.Text{
			Name: "Text-" + utils.RandSeq(10),
			Text: utils.RandomText(100),
		}

		if err := db.Create(&text).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
			c.JSON(http.StatusOK, text)
		}
	}

}
