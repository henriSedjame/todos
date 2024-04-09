
import {Database} from "bun:sqlite";
import {deleteTodo, getAllTodos, getTodoById, saveTodo, updateTodo} from "../storage";
import {createTodoEntity} from "../models";


export const getAllHandler = async (context: {db : Database}) =>
    getAllTodos(context.db)

export const postTodoHandler = async (context:{db : Database, body: {label: string}}) =>
    saveTodo(context.db, createTodoEntity(context.body.label))

export const getTodoHandler =  async (context: {db : Database, params: Record<"id", string>}) =>
    getTodoById(context.db, context.params.id)

export const updateTodoHandler = async (context: {db : Database, params: Record<"id", string>, body: {label: string, completed: boolean}}) =>
    updateTodo(context.db, context.params.id, context.body.label, context.body.completed)


export const deleteTodoHandler =  async (context: {db : Database, params: Record<"id", string>}) =>
    deleteTodo(context.db, context.params.id)