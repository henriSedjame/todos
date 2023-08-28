module StateManagement.Actions exposing (..)

import Http
import Models.Dto exposing (ApiResponse, Todo)
import Models.ViewModels exposing (FilterOption)


type TodoActions
    = CreateTodoRequested String
    | EditTodo Todo
    | UpdateTodoLabelRequested Todo
    | CompleteTodoRequested Todo
    | DeleteTodoRequested String
    | ApiResult (Result Http.Error ApiResponse)
    | EditingNewTodoLabel String
    | UpdatingTodo Todo
    | ChangeFilter FilterOption
    | ClearError
    | None
