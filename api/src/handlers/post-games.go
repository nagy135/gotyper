package handlers

import (
	"gotyper/src/models"
	"gotyper/src/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func PostGames(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
        log.Println("DOING STUFF")
		textId := c.Param("textId")
        log.Println("textId", textId)

		var text models.Text

		if err := db.Find(&text, textId).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		}

		game := models.Game{
			Name: "Game-" + utils.RandSeq(10),
			Text: text,
		}

		if err := db.Create(&game).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
			c.JSON(http.StatusOK, game)
		}
	}

}
