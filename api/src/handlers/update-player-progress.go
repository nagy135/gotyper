package handlers

import (
	"gotyper/src/models"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func UpdatePlayerProgress(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		id := c.Param("id")
        progress, err := strconv.Atoi(c.Param("progress"))
        if err != nil {
			c.AbortWithStatus(400)
			log.Println("incorrect player id")
        }

		var player models.Player

		if err := db.Find(&player, id).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		}
        player.Progress = progress

        db.Save(player)

        c.JSON(http.StatusOK, player)
	}

}
