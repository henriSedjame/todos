package models

import "github.com/edgedb/edgedb-go"

// TodoEntity : model of a _todo that is stored in the edgedb database
type TodoEntity struct {
	// Id : the generated id of the _todo
	Id edgedb.UUID `edgedb:"id"`
	// Label : the label of the _todo, it is required and must not be empty
	Label string `edgedb:"label"`
	// Completed : the completed state of the _todo, it is not required and is false by default
	Completed edgedb.OptionalBool `edgedb:"completed"`
}

// ToDTO : convert a _todo entity to a _todo dto
func (entity TodoEntity) ToDTO() TodoDto {
	completed, _ := entity.Completed.Get()
	return TodoDto{
		Id:        entity.Id.String(),
		Label:     entity.Label,
		Completed: completed,
	}
}
