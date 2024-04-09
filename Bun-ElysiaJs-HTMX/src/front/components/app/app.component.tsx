import {component} from "../utils";
import {EditTodo, FilterBar} from "../todo";
import {getAllViewsRoute} from "../routes";
import {Ids} from "../ids";


export const App = async () => {
    return component({
            name: "app"
        }, (
            <div class={'content'}>
                <div id={Ids.EDIT_TODO_BLOC_ID} class={'visible'}>
                    <EditTodo/>
                </div>
                <div id={Ids.UPDATE_TODO_BLOC_ID} class={'invisible'}></div>

                <FilterBar/>

                <div style={'margin-top: 70px'}></div>

                <div id={Ids.TODO_LIST_ID} hx-get={getAllViewsRoute} hx-trigger={'load'} hx-swap={'innerHTML'}>

                </div>
            </div>
        )
    )
}
