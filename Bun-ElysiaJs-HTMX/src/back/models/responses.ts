import { t } from 'elysia'

export const todoResponse = t.Object({
    id: t.String(),
    label: t.String(),
    completed: t.Boolean()
})

export const todoListResponse = t.Array(todoResponse)

export const todoAddedResponse  = todoResponse
export const todoUpdatedResponse  = todoResponse
export const todoDeletedResponse  = t.Boolean()