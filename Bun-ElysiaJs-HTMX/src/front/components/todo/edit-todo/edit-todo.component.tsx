import {component} from "../../utils";
import {Button, ButtonIcon} from "../button";
import {Ids} from "../../ids";
import {checkTodoViewRoute, inputChangeEventRoute, postTodoViewRoute, putTodoViewRoute} from "../../routes";
import {Todo} from "../../models";


export const EditTodo = async () => {

    return component({
            name: "edit-todo",
            path: "todo"
        }, (
            <>
                <form
                    id={'edit-form'}
                    class={'input-bloc'}
                    hx-post={postTodoViewRoute}
                    hx-target={`#${Ids.TODO_LIST_ID}`}
                    hx-swap={'beforeend'}>

                    <input
                        id={Ids.TASK_INPUT_ID}
                        type="text"
                        name="label"
                        placeholder="Add new task to achieve"
                        hx-post={`${inputChangeEventRoute}?action=edit`}
                        hx-trigger={'keyup input delay:500ms'}
                        hx-swap={'none'}

                    />
                    <Button id={Ids.ADD_TASK_BUTTON_ID} icon={ButtonIcon.ADD} submit={true}/>
                </form>
            </>
        )
    )
}

export const UpdateTodo = async (todo: Todo) => {

    return component({
            name: "edit-todo",
            path: "todo"
        }, (
            <>
                <form
                    id={'update-form'}
                    class={'input-bloc'}
                    hx-put={`${putTodoViewRoute}?id=${todo.id}&label=${todo.label}&completed=${todo.completed ? '0' : '1'}`}
                    hx-target={`#${Ids.TODO_VIEW_ID}_${todo.id}`}
                    hx-swap={'outerHTML'}>

                    <input
                        id={Ids.UPDATE_TASK_INPUT_ID}
                        type="text"
                        name="label"
                        hx-post={`${inputChangeEventRoute}?action=update`}
                        hx-trigger={'keyup input delay:500ms'}
                        hx-swap={'none'}
                    />
                    <Button id={Ids.UPDATE_TASK_BUTTON_ID} icon={ButtonIcon.UPDATE} submit={true}/>
                </form>
            </>
        )
    )
}