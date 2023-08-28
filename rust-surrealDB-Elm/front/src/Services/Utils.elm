module Services.Utils exposing (..)

import Browser.Dom
import Models.Dto exposing (Todo)
import Process
import StateManagement.Actions exposing (TodoActions(..))
import Task


toString : Bool -> String
toString b =
    if b then
        "True"

    else
        "False"


switchCompleted : Todo -> Todo
switchCompleted todo =
    { todo | completed = not todo.completed }


delay : Float -> TodoActions -> Cmd TodoActions
delay time actions =
    Process.sleep time
        |> Task.perform (\_ -> actions)


focusById : String -> Cmd TodoActions
focusById id =
    Task.attempt (\_ -> None) (Browser.Dom.focus id)
