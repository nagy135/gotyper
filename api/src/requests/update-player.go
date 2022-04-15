package requests

type UpdatePlayerRequest struct {
    Progress int `json:"progress" binding:"required"`
    Wpm int `json:"wpm" binding:"required"`
}
