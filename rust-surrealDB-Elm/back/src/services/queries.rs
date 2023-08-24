
pub const TABLE : &str = "table";
pub const LABEL : &str = "label";
pub const ID : &str = "id";
pub const EXIST_BY_LABEL: &str = r#"SELECT * FROM (
    SELECT * FROM count(
        (
            SELECT * FROM type::table($table)
            WHERE string::trim(string::lowercase(label)) = $label
        )
    )
)[0] > 0"#;

pub const EXIST_BY_ID: &str = r#"SELECT * FROM (
    SELECT * FROM count(
        (
            SELECT * FROM type::table($table)
            WHERE id = type::thing($table, $id)
        )
    )
)[0] > 0"#;
