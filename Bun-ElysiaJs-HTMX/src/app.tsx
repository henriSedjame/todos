import {Elysia} from "elysia";
import {todo_api} from "./back";
import {view_api} from "./front";


const app = new Elysia()
    .use(todo_api)
    .use(view_api)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

