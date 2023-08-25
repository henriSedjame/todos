module StateManagement.Reducers exposing (..)

import Http exposing (Error(..))
import Models.Dto exposing (ApiResponse(..))
import Services.TodoServices exposing (createTodo, deleteTodo, updateTodo)
import Services.Utils exposing (delay)
import StateManagement.Actions exposing (TodoActions(..))
import StateManagement.State exposing (State)


reduce:  TodoActions -> State -> (State, Cmd TodoActions)
reduce action state  =
    case action of
        CreateTodoRequested label -> (state , createTodo label)
        EditTodo todo ->
            (
                {state | newTodoLabelEditing = Nothing, editingTodo = Just todo},
                updateTodo todo
            )
        UpdateTodoLabelRequested todo ->  ( {state | editingTodo = Nothing } , updateTodo todo)
        CompleteTodoRequested todo -> ( state , updateTodo todo)
        DeleteTodoRequested id ->  ( state , deleteTodo id)
        ApiResult result ->
            case result of
                Ok value ->
                    apiResponseReducer state value

                Err error ->
                    let

                        msg = case error of
                                 BadUrl url -> "Bad url (" ++ url ++ ")"
                                 Timeout -> "Request timed out ⌛️"
                                 NetworkError -> "Network error 🚧"
                                 BadStatus int -> "Bad status " ++ String.fromInt int
                                 BadBody body -> "Bad body (" ++ body ++ ")"

                    in
                        (
                            { state | error = Just msg, newTodoLabelEditing = Nothing , editingTodo = Nothing },
                            delay 2000 ClearError
                        )

        EditingNewTodoLabel  label ->
            let
                s = if String.isEmpty label then Nothing else Just label
            in
            (
                 { state | newTodoLabelEditing = s },
                 Cmd.none
            )
        UpdatingTodo todo ->
            (
                 { state | editingTodo = Just todo },
                 Cmd.none
            )
        ChangeFilter option ->
            (
                { state | selectedFilter = option},
                Cmd.none
            )

        ClearError ->
            (
                { state | error = Nothing },
                Cmd.none
            )
        None -> (state, Cmd.none)


apiResponseReducer: State -> ApiResponse -> (State, Cmd TodoActions)
apiResponseReducer state response =
    case response of
        TodosLoaded todos ->
            (
                {state | todos = todos },
                Cmd.none
            )

        TodoCreated todo ->
            (
                { state | todos = todo :: state.todos , newTodoLabelEditing = Nothing},
                Cmd.none
            )

        TodoUpdated todo ->
            (
                { state | todos = (List.map  (\t -> if t.id == todo.id then todo else t) state.todos)  },
                Cmd.none
            )

        TodoDeleted id ->
            (
                { state | todos = (List.filter  (\t -> t.id /= id ) state.todos)  },
                Cmd.none
            )

        Failure msg ->
            (
                { state | error = Just msg, newTodoLabelEditing = Nothing , editingTodo = Nothing },
                Cmd.none
            )
