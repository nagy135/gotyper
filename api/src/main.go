package main

import (
	"gotyper/src/handlers"
	"gotyper/src/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {

	db, err := gorm.Open("sqlite3", "data.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	migrateModels(db)

	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/echo/:echo", func(c *gin.Context) {
		echo := c.Param("echo")
		c.JSON(http.StatusOK, gin.H{
			"echo": echo,
		})
	})

	r.POST("/upload", func(c *gin.Context) {
		form, _ := c.MultipartForm()
		files := form.File["upload[]"]

		for _, file := range files {
			log.Println(file.Filename)

			// Upload the file to specific dst.
			// c.SaveUploadedFile(file, dst)
		}
		c.JSON(http.StatusOK, gin.H{
			"uploaded": len(files),
		})
	})

	r.GET("/texts", handlers.GetTexts(db))
	r.POST("/texts", handlers.PostTexts(db))

	r.GET("/games/:id/players", handlers.GetGamePlayers(db))
	r.POST("/games/:id/join", handlers.JoinGame(db))
    r.POST("/games/create/:textId", handlers.PostGames(db))
	r.GET("/games", handlers.GetGames(db))

	r.POST("/players/:id/update-progress/:progress", handlers.UpdatePlayerProgress(db))

	r.Run() // listen and serve on 0.0.0.0:8080
}

func migrateModels(db *gorm.DB) {
	db.AutoMigrate(&models.Text{})
	db.AutoMigrate(&models.Game{})
	db.AutoMigrate(&models.Player{})
}
