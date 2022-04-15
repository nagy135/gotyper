package handlers

import (
	"gotyper/src/models"
	"gotyper/src/repository"
	"gotyper/src/requests"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func PostGames(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {

		var body requests.PostGameRequest
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if text, err := repository.TextCreate(db); err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)

			return
		} else {

			game := models.Game{
				Name: body.Name,
				Text: *text,
			}

			if err := db.Create(&game).Error; err != nil {
				c.AbortWithStatus(http.StatusInternalServerError)
				log.Println(err)
			} else {
				c.JSON(http.StatusOK, game)
			}
		}
	}

}
