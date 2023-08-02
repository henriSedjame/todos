module default {

    scalar type Label extending str {
        constraint min_len_value(1)
        constraint exclusive
    }

    type Todo {
        required label: Label,
        completed: bool {
            default := false;
        }
    }
}
