package storage

import (
	"context"
	"errors"
	"fmt"
	"github.com/edgedb/edgedb-go"
	"github.com/henriSedjame/todo_app/models"
)

const (
	GetAllTodoQuery = "SELECT Todo { id, label, completed }"
	InsertTodoQuery = "INSERT default::Todo { label := <str>$0, completed := <bool>$1 }"

	GetTodoByIdQuery = "SELECT Todo { id, label, completed } FILTER .id = <uuid>$0"

	UpdateTodoQuery = "UPDATE Todo FILTER .id = <uuid>$0 SET { label := <str>$1, completed := <bool>$2 }"

	DeleteTodoQuery = "DELETE Todo FILTER .id = <uuid>$0"

	Select = "SELECT ( %s ) { id, label, completed }"
)

func selectQuery(query string) string {
	return fmt.Sprintf(Select, query)
}

type TodoStorage struct {
	Ctx    context.Context
	Client *edgedb.Client
}

// GetAll : Get all todos
func (dao TodoStorage) GetAll() (*[]models.TodoEntity, error) {

	var entities []models.TodoEntity

	if err := dao.Client.Query(dao.Ctx, GetAllTodoQuery, &entities); err != nil {
		return nil, errors.New(err.Error())
	}

	return &entities, nil
}

// Insert : create a new _todo
func (dao TodoStorage) Insert(req models.EditTodoRequest) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	if err := dao.Client.QuerySingle(dao.Ctx, selectQuery(InsertTodoQuery), &entity, req.Label, req.Completed); err != nil {
		return nil, errors.New(err.Error())
	}

	return &entity, nil
}

// GetById : get a _todo by id
func (dao TodoStorage) GetById(id string) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	if uuid, err := edgedb.ParseUUID(id); err != nil {
		return nil, errors.New(err.Error())
	} else {
		if err := dao.Client.QuerySingle(dao.Ctx, GetTodoByIdQuery, &entity, uuid); err != nil {
			return nil, errors.New(err.Error())
		}
	}

	return &entity, nil
}

// Update : update a _todo
func (dao TodoStorage) Update(id string, req models.EditTodoRequest) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	if uuid, err := edgedb.ParseUUID(id); err != nil {
		return nil, errors.New(err.Error())
	} else {
		if err := dao.Client.QuerySingle(dao.Ctx, selectQuery(UpdateTodoQuery), &entity, uuid, req.Label, req.Completed); err != nil {
			return nil, errors.New(err.Error())
		}
	}

	return &entity, nil
}

// Delete : Delete a _todo
func (dao TodoStorage) Delete(id string) error {

	var entity models.TodoEntity

	if uuid, err := edgedb.ParseUUID(id); err != nil {
		return errors.New(err.Error())
	} else {
		if err := dao.Client.QuerySingle(dao.Ctx, DeleteTodoQuery, &entity, uuid); err != nil {
			return errors.New(err.Error())
		}
	}

	return nil
}
