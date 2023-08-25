#[macro_use]
extern crate rocket;

use rocket::{Build, Rocket};
use rocket::fs::{FileServer, relative};
use rocket::tokio::sync::Mutex;
use crate::config::init_config;
use crate::services::todo_storage::init_db;

use crate::web::{routes::*, error_handlers::*};
use crate::web::cors::Cors;

mod models;
mod web;
mod services;
mod config;


#[launch]
async fn rocket() -> Rocket<Build> {
    match init_config() {

        Ok(config) => {

            match init_db(config.db).await {

                Ok(db) => {

                    rocket::build()
                        .manage(Mutex::new(db))
                        .register("/", catchers![catch_default,catch_bad_request,catch_unprocesseable_entity])
                        .attach(Cors)
                        .mount(BASE_PATH, routes![get_all,create,update,delete])
                        .mount("/", FileServer::from(relative!("/static")))
                }

                Err(err) => {
                    println!("{}", err);
                    panic!("Failed to init surreal db")
                }
            }
        }

        Err(err) => {
            println!("{}", err);
            panic!("Failed to retrieve application config")
        }
    }
}


