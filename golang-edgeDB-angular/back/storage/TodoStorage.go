package storage

import (
	"context"
	"github.com/edgedb/edgedb-go"
	"github.com/henriSedjame/todo_app/errors"
	"github.com/henriSedjame/todo_app/models"
	"github.com/henriSedjame/todo_app/utils"
	"log"
)

type TodoStorage struct {
	Ctx    context.Context
	Client *edgedb.Client
}

// GetAll : Get all todos
func (dao TodoStorage) GetAll() (*[]models.TodoEntity, error) {

	var entities []models.TodoEntity

	if err := dao.Client.Query(dao.Ctx, GetAllTodoQuery, &entities); err != nil {
		log.Fatal(err)
		return nil, errors.FailToRetrieveTodos
	}

	return &entities, nil
}

func (dao TodoStorage) existByLabel(label string) (bool, error) {
	var exist bool
	if err := dao.Client.QuerySingle(dao.Ctx, ExistByLabelQuery, &exist, label); err != nil {
		log.Fatal(err)
		return false, errors.FailToRetrieveTodos
	}
	return exist, nil
}

// Insert : create a new _todo
func (dao TodoStorage) Insert(req models.EditTodoRequest) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	if exist, err := dao.existByLabel(req.Label); err != nil {
		return nil, err
	} else if exist {
		return nil, errors.AlreadyExist
	} else {
		if err := dao.Client.QuerySingle(dao.Ctx, selectQuery(InsertTodoQuery), &entity, req.Label, req.Completed); err != nil {
			log.Fatal(err)
			return nil, errors.FailToInsertTodo
		}
	}

	return &entity, nil
}

// GetById : get a _todo by id
func (dao TodoStorage) GetById(id string) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	err := withParsedId(id, func(uuid edgedb.UUID) error {
		if err := dao.Client.QuerySingle(dao.Ctx, GetTodoByIdQuery, &entity, uuid); err != nil {
			log.Fatal(err)
			return errors.FailToRetrieveTodos
		}
		return nil
	})

	return errorOr(&entity, err)
}

// Update : update a _todo
func (dao TodoStorage) Update(id string, req models.EditTodoRequest) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	err := withParsedId(id, func(uuid edgedb.UUID) error {
		if err := dao.Client.QuerySingle(dao.Ctx, selectQuery(UpdateTodoQuery), &entity, uuid, req.Label, req.Completed); err != nil {
			log.Fatal(err)
			return errors.FailToUpdateTodo
		}
		return nil
	})

	return errorOr(&entity, err)
}

// Delete : Delete a _todo
func (dao TodoStorage) Delete(id string) error {
	return withParsedId(id, func(uuid edgedb.UUID) error {

		var entity models.TodoEntity

		if err := dao.Client.QuerySingle(dao.Ctx, DeleteTodoQuery, &entity, uuid); err != nil {
			log.Fatal(err)
			return errors.FailToDeleteTodo
		}

		return nil
	})
}

func withParsedId(id string, consumer utils.Consumer[edgedb.UUID]) error {
	if uuid, err := edgedb.ParseUUID(id); err != nil {
		log.Fatal(err)
		return errors.InvalidId
	} else {
		return consumer(uuid)
	}
}

func errorOr[T any](t *T, err error) (*T, error) {
	if err != nil {
		return nil, err
	}
	return t, nil
}
