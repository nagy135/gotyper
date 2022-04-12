package handlers

import (
	"gotyper/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"gotyper/src/utils"
)

func JoinGame(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		id := c.Param("id")
		var game models.Game

		if err := db.Find(&game, id).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		}

		player := models.Player{
			Name:     "Player-" + utils.RandSeq(10),
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
