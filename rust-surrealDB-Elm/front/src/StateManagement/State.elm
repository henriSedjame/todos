module StateManagement.State exposing (..)

import Models.Dto exposing (Todo)
import Models.ViewModels exposing (FilterOption(..))


type alias State =
    { todos : List Todo
    , editingTodo : Maybe Todo
    , newTodoLabelEditing : Maybe String
    , selectedFilter : FilterOption
    , error : Maybe String
    }


initialState : State
initialState =
    { todos = []
    , editingTodo = Nothing
    , newTodoLabelEditing = Nothing
    , selectedFilter = All
    , error = Nothing
    }
