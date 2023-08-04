module default {

    type Todo {
        required label: str {
            constraint min_len_value(1);
        }
        completed: bool {
            default := false;
        }

        constraint exclusive on ( str_trim( str_lower( .label ) ) );
    }
}
