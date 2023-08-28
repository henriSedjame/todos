module Services.Utils exposing (..)

import Browser.Dom
import Process
import StateManagement.Actions exposing (TodoActions(..))
import Task


toString : Bool -> String
toString b =
    if b then
        "True"

    else
        "False"


delay : Float -> TodoActions -> Cmd TodoActions
delay time actions =
    Process.sleep time
        |> Task.perform (\_ -> actions)


focusById : String -> Cmd TodoActions
focusById id =
    Task.attempt (\_ -> None) (Browser.Dom.focus id)
