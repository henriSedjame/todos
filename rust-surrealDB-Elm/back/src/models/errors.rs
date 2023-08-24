use std::io::Cursor;

use rocket::{Request, Response};
use rocket::http::{ContentType, Status};
use rocket::response::Responder;
use serde::Serialize;
use thiserror::Error;

#[derive(Serialize)]
pub struct ErrorResponse {
    pub message: String
}
#[derive(Error, Debug)]
pub enum TodoError {
    #[error("Todo already exist with with label {0}")]
    AlreadyExist(String),
    #[error("Todo not found with id {0}")]
    NotFound(String),
    #[error("Fail to delete todo with id {0}")]
    FailToDelete(String),
    #[error(transparent)]
    DbError(#[from] surrealdb::Error),
    #[error(transparent)]
    ConfigError(#[from] serde_json::Error)
}

impl TodoError {
    fn status(&self) -> Status {
        match self {
            TodoError::AlreadyExist(_) => Status::Conflict,
            TodoError::DbError(_) | TodoError::FailToDelete(_) | TodoError::ConfigError(_) => Status::InternalServerError,
            TodoError::NotFound(_) => Status::NotFound
        }
    }
}
impl <'r,> Responder<'r, 'static> for TodoError {
    fn respond_to(self, _: &'r Request<'_>) -> rocket::response::Result<'static> {
        let err = serde_json::to_string(&ErrorResponse{
            message: self.to_string()
        }).unwrap();

        Response::build()
            .header(ContentType::JSON)
            .status(self.status())
            .sized_body(err.len(), Cursor::new(err))
            .ok()
    }
}