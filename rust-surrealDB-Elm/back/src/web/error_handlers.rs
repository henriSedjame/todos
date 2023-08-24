use rocket::Request;

#[catch(400)]
pub async fn catch_bad_request(_: &Request<'_>) -> String {
    "Request do not match the requirement".to_string()
}

#[catch(422)]
pub async fn catch_unprocesseable_entity(_: &Request<'_>) -> String {
    "Request do not match the requirement".to_string()
}

#[catch(default)]
pub async fn catch_default(_: &Request<'_>) -> String {
    "Unexpected error occurred".to_string()
}


