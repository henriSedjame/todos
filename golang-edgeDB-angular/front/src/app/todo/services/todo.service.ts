import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddTodoRequest, Todo, UpdateTodoRequest} from "../models/dtos";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  BASE_URL = 'http://localhost:3000/api/todos';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Todo[]>(this.BASE_URL);
  }

  create(request: AddTodoRequest) {
    return this.http.post<Todo>(this.BASE_URL, request);
  }

  update(id: string, request: UpdateTodoRequest) {
    return this.http.put<Todo>(`${this.BASE_URL}/${id}`, request);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }

}
