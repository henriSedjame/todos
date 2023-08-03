package web

import (
	"github.com/gofiber/fiber/v2"
	"github.com/henriSedjame/todo_app/errors"
	"github.com/henriSedjame/todo_app/models"
	"github.com/henriSedjame/todo_app/storage"
	"github.com/henriSedjame/todo_app/utils"
)

type TodoHandlers struct {
	Dao *storage.TodoStorage
}

func (handlers TodoHandlers) GetAll(c *fiber.Ctx) error {
	var todos []models.TodoDto

	return utils.HandleSup(
		handlers.Dao.GetAll,
		func(entities *[]models.TodoEntity) error {
			todos = make([]models.TodoDto, 0, len(*entities))
			for _, entity := range *entities {
				todos = append(todos, entity.ToDTO())
			}
			return c.JSON(todos)

		},
	)
}

func (handlers TodoHandlers) Create(c *fiber.Ctx) error {
	var request models.AddTodoRequest

	if err := c.BodyParser(&request); err != nil {
		return err
	}

	if err := validateRequest(request); err != nil {
		return err
	}

	return utils.HandleFunc(request,
		handlers.Dao.Insert,
		func(entity *models.TodoEntity) error {
			return c.JSON(entity.ToDTO())
		},
	)
}

func (handlers TodoHandlers) GetById(c *fiber.Ctx) error {
	return handleIdParam(c, func(id string) error {
		return utils.HandleFunc(
			id,
			handlers.Dao.GetById,
			func(entity *models.TodoEntity) error {
				return c.JSON(entity.ToDTO())
			},
		)
	})
}

func (handlers TodoHandlers) Update(c *fiber.Ctx) error {
	var request models.UpdateTodoRequest

	if err := c.BodyParser(&request); err != nil {
		return fiber.NewError(400, err.Error())
	}

	if err := validateRequest(request); err != nil {
		return err
	}

	return handleIdParam(c, func(id string) error {
		return utils.HandleBiFunc(
			id,
			request,
			handlers.Dao.Update,
			func(entity *models.TodoEntity) error {
				return c.JSON(entity.ToDTO())
			},
		)
	})
}

func (handlers TodoHandlers) Delete(c *fiber.Ctx) error {
	return handleIdParam(c, func(id string) error {
		return utils.HandleCons(
			id,
			handlers.Dao.Delete,
			func() error {
				return c.SendString("deleted")
			},
		)
	})
}

func handleIdParam(c *fiber.Ctx, action utils.Consumer[string]) error {
	if id := c.Params("id"); id == "" {
		return errors.InvalidId
	} else {
		return action(id)
	}
}

func validateRequest[T models.Request](t T) error {
	if valErrors := t.Validate(); valErrors != nil {
		return fiber.NewError(400, valErrors...)
	}
	return nil
}
