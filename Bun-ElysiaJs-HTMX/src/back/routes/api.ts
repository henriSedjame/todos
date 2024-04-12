import {Elysia} from "elysia";
import {
    ErrorType,
    TodoAlreadyExistError,
    TodoFailedToDeleteError,
    TodoFailedToSaveError,
    TodoFailedToUpdateError,
    TodoNotFoundError
} from "../models";
import {createDb} from "../storage";
import {API_BASE_PATH, CREATE_PATH, DELETE_PATH, GET_ALL_PATH, GET_BY_ID_PATH, UPDATE_PATH} from "./paths";
import {deleteTodoHandler, getAllHandler, getTodoHandler, postTodoHandler, updateTodoHandler} from "./handlers";
import {deleteTodoHooks, getAllHooks, getTodoHooks, postTodoHooks, updateTodoHooks} from "./hooks";

export const todo_api = new Elysia()
    .error({
        [ErrorType.TODO_ALREADY_EXISTS]: TodoAlreadyExistError,
        [ErrorType.TODO_NOT_FOUND]: TodoNotFoundError,
        [ErrorType.TODO_FAILED_TO_SAVE] : TodoFailedToSaveError,
        [ErrorType.TODO_FAILED_TO_UPDATE]: TodoFailedToUpdateError,
        [ErrorType.TODO_FAILED_TO_DELETE]: TodoFailedToDeleteError
    })
    .onError(({code, error, set}) => {
        switch (code) {
            case ErrorType.TODO_ALREADY_EXISTS:
                set.status = 409;
                break;
            case ErrorType.TODO_NOT_FOUND:
                set.status = 404;
                break;
            case ErrorType.TODO_FAILED_TO_SAVE || ErrorType.TODO_FAILED_TO_DELETE || ErrorType.TODO_FAILED_TO_UPDATE:
                set.status = 500;
                break
        }
        return error.message;
    })
    .decorate('db', createDb())
    .group(API_BASE_PATH, (app) =>
        app
            .get(GET_ALL_PATH, getAllHandler,getAllHooks)
            .post(CREATE_PATH, postTodoHandler,postTodoHooks)
            .get(GET_BY_ID_PATH, getTodoHandler, getTodoHooks)
            .put(UPDATE_PATH, updateTodoHandler,updateTodoHooks)
            .delete(DELETE_PATH, deleteTodoHandler,deleteTodoHooks)
    )

export type  TodoApi = typeof todo_api