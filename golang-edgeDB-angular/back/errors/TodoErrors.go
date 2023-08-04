package errors

import "github.com/gofiber/fiber/v2"

type TodoError int32

const (
	AlreadyExist TodoError = iota
	NotFound
	DatabaseConstraintViolate
	FailToRetrieveTodos
	FailToInsertTodo
	FailToUpdateTodo
	FailToDeleteTodo
	InvalidId
)

func (t TodoError) Error() string {

	switch t {
	case AlreadyExist:
		return AlreadyExistMsg
	case NotFound:
		return NotFoundMsg
	case DatabaseConstraintViolate:
		return DatabaseConstraintViolateMsg
	case FailToRetrieveTodos:
		return FailToRetrieveTodosMsg
	case FailToInsertTodo:
		return FailToInsertTodoMsg
	case FailToUpdateTodo:
		return FailToUpdateTodoMsg
	case FailToDeleteTodo:
		return FailToDeleteTodoMsg
	case InvalidId:
		return InvalidIdMsg
	}

	return UnexpectedErrorMsg
}

func (t TodoError) Status() int {

	switch t {
	case AlreadyExist:
		return fiber.StatusConflict
	case NotFound:
		return fiber.StatusNotFound
	case InvalidId | DatabaseConstraintViolate:
		return fiber.StatusBadRequest
	}

	return fiber.StatusInternalServerError
}
