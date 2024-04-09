import {component} from "../../utils";
import {Todo} from "../../models";
import {Ids} from "../../ids";
import {checkTodoViewRoute, deleteTodoViewRoute, editTodoEventRoute, putTodoViewRoute} from "../../routes";

export enum ButtonIcon {
    ADD = 'add',
    CHECK = 'check',
    DELETE = 'delete',
    EDIT = 'edit',
    UPDATE = 'update',
}

export interface ButtonProps {
    id: string;
    submit: boolean;
    icon: ButtonIcon | undefined;

}

export interface TodoActionButtonProps {
    todo: Todo,
}

export const Button = (props: ButtonProps) => {

    const {id, submit,icon} = props;

    return component({
        name: "button",
        path: "todo",
    }, (
        <button id={id} class={'btn'} type={ submit ? 'submit' : ''} >
            <span class={'material-symbols-outlined icon'}>{icon}</span>
        </button>
    ))
}

export const EditButton = (props: TodoActionButtonProps) => {

    const {todo} = props;

    return component({
        name: "button",
        path: "todo",
    }, (
        <button id={`${Ids.EDIT_TODO_BUTTON_ID}_${todo.id}`}
                class={'btn btn-active btn-edit'}
                hx-get={`${editTodoEventRoute}?id=${todo.id}&label=${todo.label}&completed=${todo.completed ? '0' : '1'}`}
                hx-target={`#${Ids.UPDATE_TODO_BLOC_ID}`}
                hx-swap={'innerHTML'}
        >
            <span class={'material-symbols-outlined icon'}>{ButtonIcon.EDIT}</span>
        </button>
    ))
}

export const DeleteButton = (props: TodoActionButtonProps) => {

    const {todo} = props;

    return component({
        name: "button",
        path: "todo",
    }, (
        <button id={`${Ids.DELETE_TODO_BUTTON_ID}_${todo.id}`}
                class={'btn btn-active'}
                hx-delete={`${deleteTodoViewRoute}${todo.id}`}
                hx-target={`#${Ids.TODO_VIEW_ID}_${todo.id}`}
                hx-swap={'delete'}
        >
            <span class={'material-symbols-outlined icon'}>{ButtonIcon.DELETE}</span>
        </button>
    ))
}

export const CheckButton = (props: TodoActionButtonProps) => {

    const {todo} = props;

    return component({
        name: "button",
        path: "todo",
    }, (
        <button id={`${Ids.CHECK_TODO_BUTTON_ID}_${todo.id}`}
                class={'btn btn-active'}
                hx-put={`${checkTodoViewRoute}?id=${todo.id}&label=${todo.label}&completed=${todo.completed ? '0' : '1'}`}
                hx-target={`#${Ids.TODO_VIEW_ID}_${todo.id}`}
                hx-swap={'outerHTML'}
        >
            <span class={'material-symbols-outlined icon'}>{todo.completed ? ButtonIcon.CHECK : ''}</span>
        </button>
    ))
}