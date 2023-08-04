package storage

import (
	"context"
	"errors"
	"github.com/edgedb/edgedb-go"
	tErrors "github.com/henriSedjame/todo_app/errors"
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
		return nil, handleErr(err, tErrors.FailToRetrieveTodos)
	}

	return &entities, nil
}

func (dao TodoStorage) existByLabel(label string) (bool, error) {
	var exist bool
	if err := dao.Client.QuerySingle(dao.Ctx, ExistByLabelQuery, &exist, label); err != nil {
		return false, handleErr(err, tErrors.FailToRetrieveTodos)
	}
	return exist, nil
}

func (dao TodoStorage) existByLabelAndNotId(id edgedb.UUID, label string) (bool, error) {
	var exist bool
	if err := dao.Client.QuerySingle(dao.Ctx, ExistByLabelAndNotIdQuery, &exist, id, label); err != nil {
		return false, handleErr(err, tErrors.FailToRetrieveTodos)
	}
	return exist, nil
}

// Insert : create a new _todo
func (dao TodoStorage) Insert(req models.AddTodoRequest) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	if exist, err := dao.existByLabel(req.Label); err != nil {
		return nil, err
	} else if exist {
		return nil, tErrors.AlreadyExist
	} else {
		if err := dao.Client.QuerySingle(dao.Ctx, selectQuery(InsertTodoQuery), &entity, req.Label, false); err != nil {
			return nil, handleErr(err, tErrors.FailToInsertTodo)
		}
	}

	return &entity, nil
}

// GetById : get a _todo by id
func (dao TodoStorage) GetById(id string) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	err := withParsedId(id, func(uuid edgedb.UUID) error {
		if err := dao.Client.QuerySingle(dao.Ctx, GetTodoByIdQuery, &entity, uuid); err != nil {
			return handleErr(err, tErrors.FailToRetrieveTodos)
		}
		return nil
	})

	return errorOr(&entity, err)
}

// Update : update a _todo
func (dao TodoStorage) Update(id string, req models.UpdateTodoRequest) (*models.TodoEntity, error) {

	var entity models.TodoEntity

	err := withParsedId(id, func(uuid edgedb.UUID) error {

		if exist, err := dao.existByLabelAndNotId(uuid, req.Label); err != nil {
			return err
		} else if exist {
			return tErrors.AlreadyExist
		}

		if err := dao.Client.QuerySingle(dao.Ctx, selectQuery(UpdateTodoQuery), &entity, uuid, req.Label, req.Completed); err != nil {
			return handleErr(err, tErrors.FailToUpdateTodo)
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
			return handleErr(err, tErrors.FailToDeleteTodo)
		}

		return nil
	})
}

func withParsedId(id string, consumer utils.Consumer[edgedb.UUID]) error {
	if uuid, err := edgedb.ParseUUID(id); err != nil {
		return tErrors.InvalidId
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

func handleErr(err error, defaultErr error) error {

	log.Println(err)

	var dbErr edgedb.Error

	if errors.As(err, &dbErr) {
		switch {
		case dbErr.Category(edgedb.NoDataError):
			return tErrors.NotFound
		case dbErr.Category(edgedb.ConstraintViolationError):
			return tErrors.DatabaseConstraintViolate
		}
	}

	return defaultErr
}
