module Views.EditTodoView exposing (..)

import Html exposing (Html, div, input)
import Html.Attributes exposing (class, placeholder, type_, value)

import Html.Events exposing (onInput)
import Models.Dto exposing (Todo)
import Models.ViewModels exposing (ButtonIcon(..))
import StateManagement.Actions exposing (TodoActions(..))
import Views.Btn exposing (btn)
import Views.Styles exposing (editTodoViewClass, editTodoViewStyling, inputBlocClass)


editTodoView : Maybe Todo -> Maybe String ->  Html TodoActions
editTodoView editingTodo newLabel =
    let
        onLabelChange: String -> TodoActions
        onLabelChange s =
                    case editingTodo of
                        Nothing -> EditingNewTodoLabel s
                        Just todo -> UpdatingTodo {todo | label = s}

        triple =
            case editingTodo of
                 Nothing ->
                     case newLabel of
                         Just s ->
                            (
                                ((CreateTodoRequested s), not(String.isEmpty s)),
                                 s
                             )
                         Nothing -> ((None, False), "")
                 Just todo ->
                    (
                        ((UpdateTodoLabelRequested todo), not(String.isEmpty todo.label)),
                        todo.label
                    )

        val= Tuple.second triple
        pair = Tuple.first triple
        action = Tuple.first pair
        active = Tuple.second pair
    in
        div [class editTodoViewClass] [
                editTodoViewStyling
                , div [ class inputBlocClass ] [
                    input[
                        type_ "text"
                        ,placeholder "Add new task to achieve"
                        ,value val
                        ,onInput onLabelChange
                    ][]
                    ,btn active Add action
                ]
            ]