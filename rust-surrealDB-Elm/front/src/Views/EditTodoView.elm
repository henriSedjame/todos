module Views.EditTodoView exposing (..)

import Html.Styled exposing (Html, div, input)
import Html.Styled.Attributes exposing (class, id, placeholder, type_, value)
import Html.Styled.Events exposing (onInput)
import Models.Dto exposing (Todo)
import Models.ViewModels exposing (ButtonIcon(..))
import StateManagement.Actions exposing (TodoActions(..))
import Triple exposing (Triple)
import Views.Btn exposing (btn)
import Views.Styles exposing (editTodoId, inputBlocClass)


editTodoView : Maybe Todo -> Maybe String -> Html TodoActions
editTodoView editingTodo newLabel =
    let
        onLabelChange : String -> TodoActions
        onLabelChange s =
            case editingTodo of
                Nothing ->
                    EditingNewTodoLabel s

                Just todo ->
                    UpdatingTodo { todo | label = s }

        triple : Triple TodoActions Bool String
        triple =
            case editingTodo of
                Nothing ->
                    case newLabel of
                        Just s ->
                            Triple (CreateTodoRequested s) (not (String.isEmpty s)) s

                        Nothing ->
                            Triple None False ""

                Just todo ->
                    Triple (UpdateTodoLabelRequested todo) (not (String.isEmpty todo.label)) todo.label

        val =
            triple.third

        active =
            triple.second

        action =
            triple.first
    in
    div [ class inputBlocClass ]
        [ input
            [ type_ "text"
            , id editTodoId
            , placeholder "Add new task to achieve"
            , value val
            , onInput onLabelChange
            ]
            []
        , btn active (Just Add) action
        ]
