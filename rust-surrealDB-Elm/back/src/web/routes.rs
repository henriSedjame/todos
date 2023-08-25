use rocket::State;
use rocket::form::Form;
use rocket::serde::json::Json;

use crate::models::dtos::{TodoDeletedResponse, TodoDto};
use crate::models::errors::TodoError;
use crate::models::requests::{AddTodoRequest, UpdateTodoRequest};
use crate::services::todo_storage::{create_todo, delete_todo, get_all_todos, update_todo};
use crate::services::todo_storage::DB;

pub const BASE_PATH: &str = "/api/todos";

#[get("/")]
pub async fn get_all( db: &State<DB>) -> Result<Json<Vec<TodoDto>>, TodoError> {
    get_all_todos(db.inner()).await.map(Json)
}

#[post("/", data = "<request>")]
pub async fn create(request: Form<AddTodoRequest>, db: &State<DB>) -> Result<Json<TodoDto>, TodoError> {
    create_todo(request.into_inner(), db.inner()).await.map(Json)
}

#[put("/<id>", data = "<request>")]
pub async fn update(id: String, request: Form<UpdateTodoRequest>,  db: &State<DB>) -> Result<Json<TodoDto>, TodoError> {
   update_todo(id, request.into_inner(), db.inner()).await.map(Json)
}

#[delete("/<id>")]
pub async fn delete(id: String, db: &State<DB>) -> Result<Json<TodoDeletedResponse>, TodoError> {
     delete_todo(id, db.inner()).await.map(|_| Json(TodoDeletedResponse { deleted: true }))
}
