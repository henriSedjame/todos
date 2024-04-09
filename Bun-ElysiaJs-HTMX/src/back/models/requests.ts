import { t } from 'elysia'

export const addTodoSchema = t.Object({
    label: t.String()
})

export const updateTodoSchema = t.Object({
    label: t.String(),
    completed: t.Boolean()
})

export const idParamSchema = t.Object({
    id: t.String()
})