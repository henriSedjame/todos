package web

import (
	"github.com/gofiber/fiber/v2"
	"github.com/henriSedjame/todo_app/models"
	"github.com/henriSedjame/todo_app/storage"
)

const (
	idParam      = "id"
	idIsRequired = "id is required"
)

type TodoHandlers struct {
	Dao *storage.TodoStorage
}

func (handlers TodoHandlers) GetAll(c *fiber.Ctx) error {
	var todos []models.TodoDto

	if entities, err := handlers.Dao.GetAll(); err != nil {
		return fiber.NewError(500, err.Error())
	} else {
		for _, entity := range *entities {
			todos = append(todos, entity.ToDTO())
		}
		return c.JSON(todos)
	}
}

func (handlers TodoHandlers) Create(c *fiber.Ctx) error {
	var request models.EditTodoRequest

	if err := c.BodyParser(&request); err != nil {
		return fiber.NewError(400, err.Error())
	}

	if entity, err := handlers.Dao.Insert(request); err != nil {
		return fiber.NewError(500, err.Error())
	} else {
		return c.JSON(entity.ToDTO())
	}
}

func (handlers TodoHandlers) GetById(c *fiber.Ctx) error {
	return handleIdParam(c, func(id string) error {
		if entity, err := handlers.Dao.GetById(id); err != nil {
			return fiber.NewError(500, err.Error())
		} else {
			return c.JSON(entity.ToDTO())
		}
	})
}

func (handlers TodoHandlers) Update(c *fiber.Ctx) error {
	var request models.EditTodoRequest

	if err := c.BodyParser(&request); err != nil {
		return fiber.NewError(400, err.Error())
	}

	return handleIdParam(c, func(id string) error {
		if entity, err := handlers.Dao.Update(id, request); err != nil {
			return fiber.NewError(500, err.Error())
		} else {
			return c.JSON(entity.ToDTO())
		}
	})
}

func (handlers TodoHandlers) Delete(c *fiber.Ctx) error {
	return handleIdParam(c, func(id string) error {
		if err := handlers.Dao.Delete(id); err != nil {
			return fiber.NewError(500, err.Error())
		} else {
			return c.SendString("deleted")
		}
	})
}

type Fn = func(string) error

func handleIdParam(c *fiber.Ctx, action Fn) error {
	if id := c.Params(idParam); id == "" {
		return fiber.NewError(400, idIsRequired)
	} else {
		return action(id)
	}
}
