import {TodoEntity} from "./entities";

export interface TodoDto {
    id: string,
    label: string,
    completed: boolean
}


export const fromEntity = (entity: TodoEntity) : TodoDto  => {
    return  {
        id: entity.id,
        label: entity.label,
        completed: Boolean(entity.completed).valueOf()
    }
}