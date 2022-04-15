package requests

type PostGameRequest struct {
    Name string `json:"name" binding:"required"`
}
