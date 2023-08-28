module Views.TodoView exposing (..)

import Html.Styled exposing (Html, div, span, text)
import Html.Styled.Attributes exposing (class)
import Models.Dto exposing (Todo)
import Models.ViewModels exposing (ButtonIcon(..))
import Services.Utils exposing (switchCompleted)
import StateManagement.Actions exposing (TodoActions(..))
import Views.Btn exposing (btn)
import Views.Styles exposing (spaceClass, todoActionsClass, todoCheckClass, todoLabelClass, todoLineClass)


todoView : Todo -> Maybe Todo -> Html TodoActions
todoView todo editingTodo =
    let
        isEditable =
            case editingTodo of
                Just _ ->
                    False

                Nothing ->
                    True

        isDeletable =
            case editingTodo of
                Just a ->
                    a.id /= todo.id

                Nothing ->
                    True

        editIcon =
            if todo.completed then
                Just Check

            else
                Nothing
    in
    div [ class todoLineClass ]
        [ div [ class todoCheckClass ]
            [ btn True editIcon (CompleteTodoRequested <| switchCompleted todo)
            ]
        , div [ class todoLabelClass ]
            [ span [] [ text todo.label ]
            ]
        , div [ class todoActionsClass ]
            [ (btn isEditable  <| Just Edit) <| EditTodo todo
            , div [ class spaceClass ] []
            , (btn isDeletable <| Just Delete) <| DeleteTodoRequested todo.id
            ]
        ]
