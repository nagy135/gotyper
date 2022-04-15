package handlers

import (
	"gotyper/src/models"
	"gotyper/src/requests"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func UpdatePlayerProgress(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		id := c.Param("id")

		var body requests.UpdatePlayerRequest
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var player models.Player

		if err := db.Find(&player, id).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		}
        player.Progress = body.Progress
        player.Wpm = body.Wpm

        db.Save(player)

        c.JSON(http.StatusOK, player)
	}

}
