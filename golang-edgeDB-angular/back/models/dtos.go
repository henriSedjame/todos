package models

// TodoDto : model of _todo that will be sent by the server api
type TodoDto struct {
	Id        string `json:"id"`
	Label     string `json:"label"`
	Completed bool   `json:"completed"`
}

// AddTodoRequest : model representing the request body of adding a _todo
type AddTodoRequest struct {
	Label string `json:"label"`
}

// UpdateTodoRequest : model representing the request body of updating a _todo
type UpdateTodoRequest struct {
	Label     string `json:"label"`
	Completed bool   `json:"completed"`
}
