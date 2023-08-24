use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::http::hyper::header::{ACCESS_CONTROL_ALLOW_HEADERS, ACCESS_CONTROL_ALLOW_METHODS, ACCESS_CONTROL_ALLOW_ORIGIN};

pub struct Cors;

#[rocket::async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Add cors to response",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _req: &'r Request<'_>, res: &mut Response<'r>) {
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_ORIGIN.as_str(), "*"));
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_METHODS.as_str(), "GET, POST, PUT, DELETE,OPTIONS"));
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_HEADERS.as_str(), "*"));
    }
}