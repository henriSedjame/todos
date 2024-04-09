
export const GET_ALL = 'SELECT * FROM todo'

export const INSERT = `INSERT INTO todo (id, label, completed)VALUES ($id, $label, $completed) returning *`

export const GET_BY_ID = 'SELECT * FROM todo WHERE id = $id'

export const UPDATE = `UPDATE todo SET completed = $completed, label = $label WHERE id = $id returning *`

export const DELETE = 'DELETE FROM todo WHERE id = $id'

export const EXIST_BY_ID = 'SELECT EXISTS(SELECT * FROM todo WHERE id = $id) as exist'

export const EXIST_BY_LABEL = 'SELECT EXISTS(SELECT * FROM todo WHERE label = $label) as exist'