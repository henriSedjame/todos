module Main exposing (..)

import Browser exposing (Document)
import Css exposing (marginTop, px)
import Html.Styled exposing (Html, div, span, text, toUnstyled)
import Html.Styled.Attributes exposing (class, css)
import Models.ViewModels exposing (FilterOption(..))
import Services.TodoServices exposing (getAllTodos)
import StateManagement.Actions exposing (TodoActions(..))
import StateManagement.Reducers exposing (reduce)
import StateManagement.State exposing (State, initialState)
import Views.EditTodoView exposing (editTodoView)
import Views.FilterBarView exposing (filterBarView)
import Views.Styles exposing (appContentClass, errorClass, globalStyling)
import Views.TodoView exposing (todoView)


main : Program () State TodoActions
main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = sub
        }


init : () -> ( State, Cmd TodoActions )
init () =
    ( initialState, getAllTodos )


update : TodoActions -> State -> ( State, Cmd TodoActions )
update actions state =
    reduce actions state


sub : State -> Sub TodoActions
sub _ =
    Sub.none


view : State -> Document TodoActions
view state =
    let
        todos =
            case state.selectedFilter of
                All ->
                    state.todos

                Completed ->
                    List.filter (\todo -> todo.completed) state.todos

        errorBloc =
            case state.error of
                Just e ->
                    div [ class errorClass ] [ text e ]

                Nothing ->
                    span [] []
    in
    { title = "Todo App"
    , body =
        [ globalStyling
        , div
            [ class appContentClass
            ]
            [ editTodoView state.editingTodo state.newTodoLabelEditing
            , filterBarView state.selectedFilter
            , div [ css [ marginTop (px 70) ] ] []
            , div [] (List.map (\todo -> todoView todo state.editingTodo) todos)
            , errorBloc
            ]
        ]
            |> List.map toUnstyled
    }
