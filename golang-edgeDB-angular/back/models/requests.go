package models

type Request interface {
	Validate() []string
}

// AddTodoRequest : model representing the request body of adding a _todo
type AddTodoRequest struct {
	Label string `json:"label" validate:"required"`
}

func (req AddTodoRequest) Validate() []string {
	return validationErrors(req)
}

// UpdateTodoRequest : model representing the request body of updating a _todo
type UpdateTodoRequest struct {
	Label     string `json:"label" validate:"required"`
	Completed bool   `json:"completed"`
}

func (req UpdateTodoRequest) Validate() []string {
	return validationErrors(req)
}
