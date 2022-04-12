package handlers

import (
	"gotyper/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func GetGames(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var games []models.Game

		if err := db.Find(&games).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
			c.JSON(http.StatusOK, games)
			log.Println(games)
		}
	}

}
