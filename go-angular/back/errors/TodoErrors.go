package errors

import "github.com/gofiber/fiber/v2"

type TodoError int32

const (
	AlreadyExist TodoError = iota
	NotFound
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

	return UneexpectedErrorMsg
}

func (t TodoError) Status() int {

	switch t {
	case AlreadyExist:
		return fiber.StatusConflict
	case NotFound:
		return fiber.StatusNotFound
	case FailToRetrieveTodos | FailToInsertTodo | FailToUpdateTodo | FailToDeleteTodo:
		return fiber.StatusInternalServerError
	case InvalidId:
		return fiber.StatusBadRequest
	}

	return fiber.StatusInternalServerError
}
