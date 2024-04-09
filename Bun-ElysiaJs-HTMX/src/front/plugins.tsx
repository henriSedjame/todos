import {Elysia, t} from "elysia";
import {EventsNames, HX_TRIGGER} from "./events";
import {EventRoutes, UpdateTodo} from "./components";
import {html} from "@elysiajs/html";

const DIR_PATH = import.meta.dir

export const styles_plugin = new Elysia()
    .group("styles", (app) => app
        .get("", () => Bun.file(`${DIR_PATH}/styles.css`))
        .get("/component", ({query}) => {

            let qpath = query.path;
            let path = (qpath !== undefined) ? `/${qpath}` : '';
            let name = query.name;
            return Bun.file(`${DIR_PATH}/components${path}/${name}/${name}.component.css`);
        }, {
            query: t.Object({
                path: t.Optional(t.String()),
                name: t.String()
            })
        }))


export const events_plugins = new Elysia()
    .use(html())
    .group(EventRoutes.BASE_PATH_EVENT, (app) =>
        app
            .post(EventRoutes.INPUT_CHANGE_EVENT,
                ({body, query, set}) => {
                    set.headers[HX_TRIGGER] = JSON.stringify({
                        [EventsNames.LABEL_CHECKED]: {
                            valid: body.label.length >= 3,
                            action: query.action
                        },
                    });
                },
                {
                    body: t.Object({
                        label: t.String()
                    }),
                    query: t.Object({
                        action: t.String()
                    })

                })
            .get(EventRoutes.EDIT_TODO_EVENT, ({query, set}) => {
                set.headers[HX_TRIGGER] = JSON.stringify({
                    [EventsNames.START_TODO_EDITING]: {
                        id: query.id,
                        label: query.label,
                    },
                });
                return (<UpdateTodo id={query.id} label={query.label} completed={Boolean(Number(query.completed).valueOf())}/>)
            }, {
                query: t.Object({
                    id: t.String(),
                    label: t.String(),
                    completed: t.String()
                })
            })
            .get(EventRoutes.FILTER_TODOS_EVENT, ({query, set}) => {
                set.headers[HX_TRIGGER] = JSON.stringify({
                    [EventsNames.FILTER_TODOS]: query.filter,
                });
            },{
                query: t.Object({
                    filter: t.String()
                })
            })
    )