use rocket::serde::Deserialize;

#[derive(Deserialize, FromForm)]
#[serde(crate="rocket::serde")]
pub struct AddTodoRequest {
    #[field(validate= len(1..))]
    pub label: String
}

#[derive(Deserialize, FromForm)]
#[serde(crate="rocket::serde")]
pub struct UpdateTodoRequest {
    #[field(validate= len(1..))]
    pub label: String,
    pub completed: bool
}