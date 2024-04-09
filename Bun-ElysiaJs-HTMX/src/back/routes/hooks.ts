import {
    addTodoSchema, idParamSchema,
    todoAddedResponse, todoDeletedResponse,
    todoListResponse,
    todoResponse,
    todoUpdatedResponse,
    updateTodoSchema
} from "../models";

export const getAllHooks = {
    response: todoListResponse
}

export const postTodoHooks = {
    body: addTodoSchema,
    response: todoAddedResponse
}

export const getTodoHooks = {
    response: todoResponse,
    params: idParamSchema
}

export const updateTodoHooks = {
    body: updateTodoSchema,
    response: todoUpdatedResponse,
    params: idParamSchema
}

export const deleteTodoHooks = {
    response: todoDeletedResponse,
    params: idParamSchema
}