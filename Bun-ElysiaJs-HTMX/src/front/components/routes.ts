
export enum ViewsRoutes {
    BASE_PATH_VIEW = '/views/todos',
    GET_ALL_VIEW = '/',
    POST_TODO_VIEW = '/',
    PUT_TODO_VIEW = '/',
    DELETE_TODO_VIEW = '/:id',
    CHECK_TODO_VIEW = '/check',
}


export const getAllViewsRoute = `${ViewsRoutes.BASE_PATH_VIEW}${ViewsRoutes.GET_ALL_VIEW}`
export const postTodoViewRoute = `${ViewsRoutes.BASE_PATH_VIEW}${ViewsRoutes.POST_TODO_VIEW}`
export const putTodoViewRoute = `${ViewsRoutes.BASE_PATH_VIEW}${ViewsRoutes.PUT_TODO_VIEW}`
export const checkTodoViewRoute = `${ViewsRoutes.BASE_PATH_VIEW}${ViewsRoutes.CHECK_TODO_VIEW}`
export const deleteTodoViewRoute = `${ViewsRoutes.BASE_PATH_VIEW}${ViewsRoutes.DELETE_TODO_VIEW.replace(':id', '')}`

export enum EventRoutes {
    BASE_PATH_EVENT = '/events',
    INPUT_CHANGE_EVENT = '/input/change',
    EDIT_TODO_EVENT = '/edit',
    FILTER_TODOS_EVENT = '/filter',

}

export const inputChangeEventRoute = `${EventRoutes.BASE_PATH_EVENT}${EventRoutes.INPUT_CHANGE_EVENT}`
export const editTodoEventRoute = `${EventRoutes.BASE_PATH_EVENT}${EventRoutes.EDIT_TODO_EVENT}`
export const filterTodosEventRoute = `${EventRoutes.BASE_PATH_EVENT}${EventRoutes.FILTER_TODOS_EVENT}`