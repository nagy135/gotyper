package handlers

import (
	"gotyper/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func DeleteGames(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		id := c.Param("id")
		if err := db.Delete(&models.Game{}, id).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
            c.JSON(http.StatusOK, map[string]interface{}{})
		}
	}

}
