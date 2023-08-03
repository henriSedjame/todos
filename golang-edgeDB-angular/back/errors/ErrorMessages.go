package errors

const (
	AlreadyExistMsg        string = "Todo already exist with this label"
	NotFoundMsg                   = "Todo not found with the given id"
	FailToRetrieveTodosMsg        = "Fail to retrieve todos"
	FailToInsertTodoMsg           = "Fail to insert todo"
	FailToUpdateTodoMsg           = "Fail to update todo"
	FailToDeleteTodoMsg           = "Fail to delete todo"
	InvalidIdMsg                  = "Path param `id` is missing or invalid"

	UneexpectedErrorMsg = "Unexpected error occurred"
)
