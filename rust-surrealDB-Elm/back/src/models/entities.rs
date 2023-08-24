use serde::{Deserialize, Serialize};
use surrealdb::sql::Thing;

#[derive(Serialize, Deserialize, Debug)]
pub struct TodoEntity {
    pub id: Thing,
    pub label: String,
    pub completed: bool
}


#[derive(Serialize, Deserialize, Debug)]
pub struct Todo {
    pub label: String,
    pub completed: bool
}