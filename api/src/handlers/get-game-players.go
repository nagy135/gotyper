package handlers

import (
	"gotyper/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func GetGamePlayers(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		id := c.Param("id")
		var game models.Game

		if err := db.Preload("Players").Find(&game, id).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		}
		c.JSON(http.StatusOK, game)
	}

}
