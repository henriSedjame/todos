import {component} from "../../utils";
import {filterTodosEventRoute} from "../../routes";

export const FilterBar = () => component({
    name: "filter-bar",
    path: "todo",
}, (
    <div class={'filter-bloc'}>
       <span id={'filter-all'}
             class={'filter-option active'}
             hx-get={`${filterTodosEventRoute}?filter=all`}
             hx-swap={'none'}>View All</span>

        <div class={'filter-divider'}></div>
       <span id={'filter-completed'}
             class={'filter-option'}
             hx-get={`${filterTodosEventRoute}?filter=completed`}
             hx-swap={'none'}>Completed</span>
    </div>
))
