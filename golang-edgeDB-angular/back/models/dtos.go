package models

// TodoDto : model of _todo that will be sent by the server api
type TodoDto struct {
	Id        string `json:"id"`
	Label     string `json:"label"`
	Completed bool   `json:"completed"`
}
