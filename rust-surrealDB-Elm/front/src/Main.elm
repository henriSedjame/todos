module Main exposing (..)


import Browser exposing (Document)
import Html.Attributes exposing (class)
import Html exposing (Html, div)
import Services.TodoServices exposing (getAllTodos)
import StateManagement.Actions exposing (TodoActions(..))
import StateManagement.Reducers exposing (reduce)
import StateManagement.State exposing (State, initialState)
import Views.EditTodoView exposing (editTodoView)
import Views.Styles exposing (appContentClass, globalStyling)


main : Program () State TodoActions
main =
  Browser.document {
    init = init,
    update = update,
    view = view,
    subscriptions = sub
  }



init : () ->  (State, Cmd TodoActions)
init () = (initialState, getAllTodos)

update : TodoActions -> State -> (State, Cmd TodoActions)
update actions state = reduce actions state

sub : State -> Sub TodoActions
sub _ =
    Sub.none


view : State -> Document TodoActions
view state =
    let
        todos = state.todos
    in
        {
            title= "",
            body = [
                 globalStyling
                ,div [
                    class appContentClass
                ][
                    editTodoView state.editingTodo  state.newTodoLabelEditing
                ]

            ]
        }

