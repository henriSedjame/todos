module Services.Utils exposing (..)

import Http exposing (Metadata)
import Process
import StateManagement.Actions exposing (TodoActions)
import Task

toString: Bool -> String
toString b =
    if b then "True" else "False"

delay: Float -> TodoActions -> Cmd TodoActions
delay time actions =
    Process.sleep time
        |> Task.perform (\_ -> actions)


