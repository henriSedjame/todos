use rocket::tokio::sync::Mutex;
use surrealdb::engine::remote::ws::{Client, Ws};
use surrealdb::Surreal;

use crate::config::DBConfig;
use crate::models::dtos::TodoDto;
use crate::models::entities::{Todo, TodoEntity};
use crate::models::errors::TodoError;
use crate::models::requests::{AddTodoRequest, UpdateTodoRequest};
use crate::services::queries::{EXIST_BY_ID, EXIST_BY_LABEL, ID, LABEL, TABLE};

const TODOS: &str = "todos";

pub type DB = Mutex<Surreal<Client>>;

pub async fn init_db(config: DBConfig) -> Result<Surreal<Client>, TodoError> {

    let db = Surreal::new::<Ws>(config.url()).await?;

    db.signin(config.credentials()).await?;

    db.use_ns(config.namespace)
        .use_db(config.database)
        .await?;

    Ok(db)
}

async fn exist_by_label(label: String, db: &DB) -> Result<bool, TodoError> {
    db.lock().await
        .query(EXIST_BY_LABEL)
        .bind((TABLE, TODOS))
        .bind((LABEL, label.to_lowercase().trim()))
        .await?
        .take::<Vec<bool>>(0)
        .map_err(TodoError::DbError)
        .map(|res| res[0])
}

async fn exist_by_id(id: String, db: &DB) -> Result<bool, TodoError> {
    db.lock().await
        .query(EXIST_BY_ID)
        .bind((TABLE, TODOS))
        .bind((ID, id))
        .await?
        .take::<Vec<bool>>(0)
        .map_err(TodoError::DbError)
        .map(|res| res[0])
}

pub async fn get_all_todos(db: &DB) -> Result<Vec<TodoDto>, TodoError> {
    db.lock().await
        .select::<Vec<TodoEntity>>(TODOS)
        .await
        .map_err(TodoError::DbError)
        .map(|todos|
            todos
                .into_iter()
                .map(TodoDto::from)
                .collect()
        )
}

pub async fn create_todo(request: AddTodoRequest, db: &DB) -> Result<TodoDto, TodoError> {
    if exist_by_label(request.label.clone(), db).await? {
        return Err(TodoError::AlreadyExist(request.label.clone()));
    }

    let entity: surrealdb::Result<TodoEntity> = db.lock().await
        .create(TODOS)
        .content::<Todo>(Todo {
            label: request.label,
            completed: false,
        }).await;

    entity
        .map_err(TodoError::DbError)
        .map(TodoDto::from)
}

pub async fn update_todo(id: impl Into<String>, request: UpdateTodoRequest, db: &DB) -> Result<TodoDto, TodoError> {

    let id = id.into();

    if !exist_by_id(id.clone(), db).await? {
        return Err(TodoError::NotFound(id.clone()));
    }

    let entity: surrealdb::Result<TodoEntity> = db.lock().await
        .update((TODOS, id.clone()))
        .content(Todo {
            label: request.label,
            completed: request.completed,
        }).await;

    entity.map_err(TodoError::DbError)
        .map(TodoDto::from)
}

pub async fn delete_todo(id: String, db: &DB) -> Result<(), TodoError> {
    
    let entity: Option<TodoEntity> = db.lock().await
        .delete((TODOS, id.clone()))
        .await?;
    
    if entity.is_none() {
        return Err(TodoError::FailToDelete(id))
    }
    
    Ok(())
}