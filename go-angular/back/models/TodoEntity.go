package models

import "github.com/edgedb/edgedb-go"

type TodoEntity struct {
	Id        edgedb.UUID         `edgedb:"id"`
	Label     string              `edgedb:"label"`
	Completed edgedb.OptionalBool `edgedb:"completed"`
}

func (entity TodoEntity) ToDTO() TodoDto {
	completed, _ := entity.Completed.Get()
	return TodoDto{
		Id:        entity.Id.String(),
		Label:     entity.Label,
		Completed: completed,
	}
}
