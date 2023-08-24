use serde::Deserialize;
use surrealdb::opt::auth::Root;
use crate::models::errors::TodoError;

#[derive(Deserialize, Debug)]
pub struct AppConfig {
    pub db: DBConfig
}

#[derive(Deserialize, Debug)]
pub struct DBConfig {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub namespace: String,
    pub database: String
}

impl DBConfig {
    pub fn url(&self) -> String {
       format!("{}:{}", self.host, self.port)
    }

    pub fn credentials(&self) -> Root {
        Root{
            username: self.username.as_str(),
            password: self.password.as_str()
        }
    }
}

pub fn init_config() -> Result<AppConfig, TodoError> {
    serde_json::from_str::<AppConfig>(include_str!("../config.json"))
        .map_err(TodoError::ConfigError)
}