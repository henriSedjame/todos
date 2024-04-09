import {Database} from "bun:sqlite";
import {deleteTodo, getAllTodos, saveTodo, updateTodo} from "../back/storage";
import {TodoView} from "./components";
import {createTodoEntity} from "../back";
import {EventsNames, HX_TRIGGER} from "./events";


export const getAllViewHandler = async (context: { db: Database }) =>
    getAllTodos(context.db).then(
        todos => (
                <div>
                    {todos.map(todo => (
                        <TodoView todo={todo}/>
                    ))}
                </div>
            )

    )

export const postTodoViewHandler = async (context:{db : Database, body: {label: string}, set: any}) =>
    saveTodo(context.db, createTodoEntity(context.body.label))
        .then(todo => {
            context.set.headers[HX_TRIGGER] = JSON.stringify({
                [EventsNames.TODO_ADDED]: true,
            });
            return <TodoView todo={todo}/>
        })


export const putTodoViewHandler = async (context:{db : Database, body: {label: string}, query: {id: string, completed: string},  set: any}) =>
    updateTodo(context.db, context.query.id, context.body.label, Boolean(Number(context.query.completed).valueOf()))
        .then(todo => {
            context.set.headers[HX_TRIGGER] = JSON.stringify({
                [EventsNames.TODO_UPDATED]: true,
            });
            return <TodoView todo={todo}/>
        })


export const deleteTodoViewHandler = async (context:{db : Database,  params: {id: string},  set: any}) =>
    deleteTodo(context.db, context.params.id).then(_ => <></>)

export const checkTodoViewHandler = async (context:{db : Database, query: {id: string, label: string, completed: string},  set: any}) =>
    updateTodo(context.db, context.query.id, context.query.label, Boolean(Number(context.query.completed).valueOf()))
        .then(todo => {
            context.set.headers[HX_TRIGGER] = JSON.stringify({
                [EventsNames.TODO_UPDATED]: true,
            });
            return <TodoView todo={todo}/>
        })