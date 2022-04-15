package handlers

import (
	"gotyper/src/models"
	"gotyper/src/requests"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func JoinGame(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {

		var body requests.JoinGameRequest
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		id := c.Param("id")

		var game models.Game

		if err := db.Find(&game, id).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		}

		player := models.Player{
			Name:     body.Name,
			Game:     game,
			Progress: 0,
		}

		if err := db.Create(&player).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
			c.JSON(http.StatusOK, player)
		}
	}

}
