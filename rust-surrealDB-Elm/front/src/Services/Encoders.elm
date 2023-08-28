module Services.Encoders exposing (..)

import Http exposing (Part)
import Models.Dto exposing (AddTodoRequest, UpdateTodoRequest)
import Services.Utils exposing (toString)


addTodoRequestEncoder : AddTodoRequest -> List Part
addTodoRequestEncoder request =
    [ Http.stringPart "label" request.label
    ]


updateTodoRequestEncoder : UpdateTodoRequest -> List Part
updateTodoRequestEncoder request =
    [ Http.stringPart "label" request.label
    , toString request.completed |> Http.stringPart "completed"
    ]
