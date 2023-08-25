module Services.TodoServices exposing (..)

import Http
import Models.Dto exposing (ApiCall(..), ApiResponse(..), Todo)
import Services.Decoders exposing (responseDecoder)
import Services.Encoders exposing (addTodoRequestEncoder, updateTodoRequestEncoder)
import StateManagement.Actions exposing (TodoActions(..))

baseUrl = "http://localhost:8080/api/todos"

getAllTodos: Cmd TodoActions
getAllTodos =
    Http.get
    {
        url = baseUrl
        ,expect = Http.expectStringResponse ApiResult (responseDecoder GetAll)
    }

createTodo: String -> Cmd TodoActions
createTodo label=
    Http.post
    {
        url = baseUrl
        ,body = addTodoRequestEncoder { label = label}  |> Http.multipartBody
        ,expect = Http.expectStringResponse ApiResult (responseDecoder Create)
    }

updateTodo: Todo -> Cmd TodoActions
updateTodo todo =
    Http.request
    {
        method = "PUT"
        ,url = baseUrl ++ "/" ++ todo.id
        ,headers = []
        ,body = updateTodoRequestEncoder { label = todo.label, completed = todo.completed} |> Http.multipartBody
        ,expect =  responseDecoder Update |> Http.expectStringResponse ApiResult
        ,timeout = Nothing
        ,tracker = Nothing
    }

deleteTodo: String -> Cmd TodoActions
deleteTodo id =
    Http.request
    {
        method = "DELETE"
        ,url = baseUrl ++ "/" ++ id
        ,headers = []
        ,body = Http.emptyBody
        ,expect = Delete id |> responseDecoder |> Http.expectStringResponse ApiResult
        ,timeout = Nothing
        ,tracker = Nothing
    }