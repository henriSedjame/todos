use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::{ContentType, Header, Method, Status};
use rocket::http::hyper::header::{ACCESS_CONTROL_ALLOW_CREDENTIALS, ACCESS_CONTROL_ALLOW_HEADERS, ACCESS_CONTROL_ALLOW_METHODS, ACCESS_CONTROL_ALLOW_ORIGIN};

pub struct Cors;

#[rocket::async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Add cors to response",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, req: &'r Request<'_>, res: &mut Response<'r>) {
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_ORIGIN.as_str(), "*"));
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_METHODS.as_str(), "GET, POST, PUT, DELETE,OPTIONS"));
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_HEADERS.as_str(), "*"));
        res.set_header(Header::new(ACCESS_CONTROL_ALLOW_CREDENTIALS.as_str(), "true"));

        if req.method() == Method::Options {
            let body = "";
            res.set_header(ContentType::Plain);
            res.set_sized_body(body.len(), std::io::Cursor::new(body));
            res.set_status(Status::Ok);
        }
    }
}
