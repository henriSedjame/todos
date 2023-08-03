module default {

    type Todo {
        required label: str {
            constraint min_len_value(1);
            constraint exclusive;
        }
        completed: bool {
            default := false;
        }
    }
}
