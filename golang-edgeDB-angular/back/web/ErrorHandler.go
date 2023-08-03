package web

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	todo_errors "github.com/henriSedjame/todo_app/errors"
)

func ErrorHandler(ctx *fiber.Ctx, err error) error {

	var code = fiber.StatusInternalServerError
	var msg = err.Error()

	var fiberError *fiber.Error
	if errors.As(err, &fiberError) {
		code = fiberError.Code
		msg = fiberError.Message
	}

	var todoError todo_errors.TodoError
	if errors.As(err, &todoError) {
		code = todoError.Status()
	}

	return ctx.Status(code).SendString(msg)

}
