import {getMigrations, migrate} from 'bun-sqlite-migrations'
import {Database} from 'bun:sqlite'
import {
    fromEntity,
    TodoAlreadyExistError,
    TodoEntity,
    TodoFailedToSaveError,
    TodoFailedToUpdateError,
    TodoNotFoundError
} from "../models";
import {DELETE, EXIST_BY_ID, EXIST_BY_LABEL, GET_ALL, GET_BY_ID, INSERT, UPDATE} from "./queries";

interface ExistResult {
    exist: number
}

export const createDb = () => {
    const db = new Database('todos.sqlite', {create: true});
    migrate(db, getMigrations('./migrations'))
    return db
}

export const getAllTodos = async (db: Database) => {
    return (db.query<TodoEntity, any>(GET_ALL).all() || [])
        .map(entity => fromEntity(entity))
}

export const saveTodo = async (db: Database, todo: TodoEntity) => {
    const exist = await existByLabel(db, todo.label) || {exist: 0}


    if (Boolean(exist.exist).valueOf()) {
        throw new TodoAlreadyExistError(todo.label)
    }

    let entity = db.prepare<TodoEntity, any>(INSERT).get({
        $id: todo.id,
        $label: todo.label,
        $completed: todo.completed
    });
    if (entity) return fromEntity(entity)

    throw new TodoFailedToSaveError()
}

export const getTodoById = async (db: Database, id: string) => {
    let entity = db.prepare<TodoEntity, any>(GET_BY_ID).get({$id: id});
    if (entity) return fromEntity(entity)
    throw new TodoNotFoundError(id)
}

export const updateTodo = async (db: Database, id: string, label: string, completed: boolean) => {

    const exist = await existById(db, id) || {exist: 0}

    if (!Boolean(exist.exist).valueOf()) {
        throw new TodoNotFoundError(id)
    }

    console.log('updateTodo', id, label, completed)

    const entity = db.prepare<TodoEntity, any>(UPDATE).get({
        $id: id,
        $label: label,
        $completed: completed
    })

    console.log('entity', entity)
    if (entity) return fromEntity(entity)

    throw new TodoFailedToUpdateError(id)
}

export const deleteTodo = async (db: Database, id: string) => {
    const exist = await existById(db, id) || {exist: 0}

    if (!Boolean(exist.exist).valueOf()) {
        throw new TodoNotFoundError(id)
    }

    db.prepare(DELETE).run({$id: id})

    return true
}

const existById = async (db: Database, id: string) => {
    return db.prepare<ExistResult, any>(EXIST_BY_ID).get({$id: id})
}

const existByLabel = async (db: Database, label: string) => {
    return db.prepare<ExistResult, any>(EXIST_BY_LABEL).get({$label: label})
}