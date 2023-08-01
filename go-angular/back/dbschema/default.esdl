module default {
    type Todo {
        required label: str;
        completed: bool {
            default := false;
        }
    }
}
