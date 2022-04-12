package handlers

import (
	"gotyper/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func GetTexts(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var texts []models.Text

		if err := db.Find(&texts).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
			c.JSON(http.StatusOK, texts)
			log.Println(texts)
		}
	}

}
