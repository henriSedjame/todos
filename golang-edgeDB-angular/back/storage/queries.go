package storage

import "fmt"

const (
	GetAllTodoQuery = `SELECT default::Todo { 
		id, 	
		label, 
		completed 
    }`

	ExistByLabelQuery = `SELECT count( 
			( SELECT default::Todo Filter str_trim( str_lower( .label ) ) = str_trim( str_lower ( <str>$0) ) ) 
    ) > 0`

	InsertTodoQuery = `INSERT default::Todo {
		label := <str>$0, 	
		completed := <bool>$1 
	}`

	GetTodoByIdQuery = `SELECT default::Todo { 
		id, 
		label, 
		completed 
	} FILTER .id = <uuid>$0`

	UpdateTodoQuery = `UPDATE default::Todo 
    	FILTER .id = <uuid>$0 SET {
		   label := <str>$1, 
		   completed := <bool>$2 
	   }`

	DeleteTodoQuery = "DELETE default::Todo FILTER .id = <uuid>$0"

	Select = "SELECT ( %s ) { id, label, completed }"
)

func selectQuery(query string) string {
	return fmt.Sprintf(Select, query)
}
