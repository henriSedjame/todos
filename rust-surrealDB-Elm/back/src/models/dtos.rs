use rocket::serde::Serialize;

use crate::models::entities::TodoEntity;

#[derive(Serialize, Clone)]
#[serde(crate="rocket::serde")]
pub struct TodoDto {
    pub id: String,
    pub label: String,
    pub completed: bool
}

impl From<TodoEntity> for TodoDto {
    fn from(entity: TodoEntity) -> Self {
        Self {
            id: entity.id.id.to_string(),
            label: entity.label,
            completed: entity.completed
        }
    }
}

#[derive(Serialize, Clone)]
#[serde(crate="rocket::serde")]
pub struct TodoDeletedResponse {
    pub deleted: bool
}