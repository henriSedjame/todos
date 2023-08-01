package models

// TodoDto :
type TodoDto struct {
	Id        string `json:"id"`
	Label     string `json:"label"`
	Completed bool   `json:"completed"`
}

type EditTodoRequest struct {
	Label     string `json:"label"`
	Completed bool   `json:"completed"`
}
