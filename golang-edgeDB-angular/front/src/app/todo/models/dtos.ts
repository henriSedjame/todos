export interface AddTodoRequest {
  label: string;
}

export interface UpdateTodoRequest {
  label?: string;
  completed?: boolean;
}

export interface Todo {
  id: string;
  label: string;
  completed: boolean;
}
