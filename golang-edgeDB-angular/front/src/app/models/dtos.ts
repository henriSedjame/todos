export interface AddTodoRequest {
  label: string;
}

export interface UpdateTodoRequest {
  label?: string;
  completed?: boolean;
}
