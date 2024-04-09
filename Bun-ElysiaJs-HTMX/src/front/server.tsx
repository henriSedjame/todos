import {Elysia, t} from "elysia";
import staticPlugin from "@elysiajs/static";
import {html} from "@elysiajs/html";

import {events_plugins, styles_plugin} from "./plugins";
import {createDb, getAllTodos} from "../back/storage";

import {App, TodoView, ViewsRoutes} from "./components";
import {
    checkTodoViewHandler,
    deleteTodoViewHandler,
    getAllViewHandler,
    postTodoViewHandler,
    putTodoViewHandler
} from "./server-view-handlers";


const DIR_PATH = import.meta.dir

export const view_api =  new Elysia()
    .use(html())
    .decorate("db", createDb())
    .use(staticPlugin({assets: `${DIR_PATH}/public`, prefix:""}))
    .use(styles_plugin)
    .use(events_plugins)
    .get("", () => <Index />)
    .get("/global.ts", () => Bun.file(`${DIR_PATH}/global.ts`))
    .group(ViewsRoutes.BASE_PATH_VIEW, (app) =>
        app
            .get(ViewsRoutes.GET_ALL_VIEW, getAllViewHandler)
            .post(ViewsRoutes.POST_TODO_VIEW, postTodoViewHandler)
            .put(ViewsRoutes.PUT_TODO_VIEW, putTodoViewHandler, {
                query: t.Object({
                  id: t.String(),
                  completed: t.String()
                }),
                body: t.Object({
                    label: t.String()
                })
            })
            .delete(ViewsRoutes.DELETE_TODO_VIEW, deleteTodoViewHandler, {
                params: t.Object({
                    id: t.String()
                })
            })
            .put(ViewsRoutes.CHECK_TODO_VIEW, checkTodoViewHandler, {
                query: t.Object({
                    id: t.String(),
                    label: t.String(),
                    completed: t.String()
                })

            })

    );

export const Index = () => {
    return (
        <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <title>TodoApp</title>
            <base href="/"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" type="image/x-icon" href="favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
                  rel="stylesheet"/>
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
            <link rel="stylesheet" href="/styles"/>
            <script src="https://unpkg.com/htmx.org@1.9.11"
                    integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0"
                    crossorigin="anonymous"></script>

        </head>
        <body>
        <App/>
        <script src="./global.ts" type={'module'}/>

        </body>
        </html>
    );
}


