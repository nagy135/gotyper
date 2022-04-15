package handlers

import (
	"gotyper/src/repository"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func PostTexts(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		if text, err := repository.TextCreate(db); err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			log.Println(err)
		} else {
			c.JSON(http.StatusOK, text)
		}
	}

}
