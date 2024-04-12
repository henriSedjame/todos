import {TodoView} from "./components";
import {EventsNames, HX_TRIGGER} from "./events";
import { treaty } from '@elysiajs/eden'
import {TodoApi} from "../back";

const client = treaty<TodoApi>('localhost:3000').api

export const getAllViewHandler = async () =>
    client.todos.index.get().then(
        todos => (
                <div>
                    {todos.data?.map(todo => (
                        <TodoView todo={todo}/>
                    ))}
                </div>
            )
    )

export const postTodoViewHandler = async (context:{body: {label: string}, set: any}) => {
    console.log(context.body.label)

    return client.todos.index.post({
        label: context.body.label
    }).then(response => {
        context.set.headers[HX_TRIGGER] = JSON.stringify({
            [EventsNames.TODO_ADDED]: true,
        });
        if (response.data) {
            return <TodoView todo={response.data}/>
        }
        throw new Error(response.error?.value?.toString())
    })
}


export const putTodoViewHandler = async (context:{body: {label: string}, query: {id: string, completed: string},  set: any}) =>
        client.todos({id: context.query.id}).put({
            label: context.body.label,
            completed: Boolean(Number(context.query.completed).valueOf())
        }).then(response => {
            context.set.headers[HX_TRIGGER] = JSON.stringify({
                [EventsNames.TODO_UPDATED]: true,
            });
            if (response.data) return <TodoView todo={response.data}/>
            return <></>
        })


export const deleteTodoViewHandler = async (context:{params: {id: string},  set: any}) =>
    client.todos({id: context.params.id}).delete().then(_ => <></>)

export const checkTodoViewHandler = async (context:{query: {id: string, label: string, completed: string},  set: any}) =>
        client.todos({id: context.query.id}).put({
            label: context.query.label,
            completed: Boolean(Number(context.query.completed).valueOf())
        }).then(response => {
            context.set.headers[HX_TRIGGER] = JSON.stringify({
                [EventsNames.TODO_UPDATED]: true,
            });
            if(response.data) return <TodoView todo={response.data}/>
            return <></>
        })