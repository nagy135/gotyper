package requests

type JoinGameRequest struct {
    Name string `json:"name" binding:"required"`
}
