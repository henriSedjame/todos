import {component} from "../../utils";
import {CheckButton, DeleteButton, EditButton} from "../button";
import {Ids} from "../../ids";
import {Todo} from "../../models";


export interface TodoViewProps {
    todo: Todo;
}

export const TodoView = (props: TodoViewProps) => {

    const { todo } = props

    const viewClass = todo.completed ? 'todo-line' : 'todo-line not-completed';

    return component(
        {
            name: "todo-view",
            path: "todo"
        },
        (
            <div id={`${Ids.TODO_VIEW_ID}_${todo.id}`} class={viewClass}>

                <div class={'todo-check'}>
                    <CheckButton todo={todo} />
                </div>

                <div class={'todo-label'}>
                    <span>{todo.label}</span>
                </div>

                <div class={'todo-actions'}>
                    <EditButton todo={todo} />
                    <div class={'space'}></div>
                    <DeleteButton todo={todo} />
                </div>
            </div>
        ));
}