# Todos

Todos App is a good example of application to demonstrate a simple CRUD (Create, Read, Update, Delete) application using any programming language.

As a developer, i love learning new programming languages and frameworks. So in this repository, i will try to implement the same application using different programming languages and frameworks.

### Todo Model

A `Todo` is a simple model with the following attributes:

- `id`: Unique identifier of the todo
- `label`: Label of the todo
- `completed`: Status of the todo (completed or not)


### Todo API

The API of the application is very simple and has the following endpoints:

- `GET /todos`: List all todos
- `POST /todos`: Create a new todo
- `GET /todos/:id`: Get a todo by id
- `PUT /todos/:id`: Update a todo by id
- `DELETE /todos/:id`: Delete a todo by id

### Todo UI

The UI of the application is very simple and has only one page with the following features:

- List all todos
- Create a new todo
- Edit an existing todo label
- Mark a todo as completed
- Delete a todo

<img alt="todo view" style="border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 0 5px #ddd;" src="assets/todo-ui.png" width="700px"/>

___

### 1 - Golang / Angular
    
- **Backend**: [Golang 1.20](https://golang.org/)
    
- **Frontend**: [Angular 16](https://angular.io/)

- **Database**: [EdgeDB v3](https://edgedb.com/)

In this example, i've used [Golang](https://golang.org/) as a backend language and [Fiber v2](https://gofiber.io/) framework to build the API.
Since I used version 1.20 of Golang, it was an opportunity to test the use of `generics` that appeared in version 1.18. 

An example of usage of generics in the project 👇

```go
package utils

type (
	Consumer[T any] func(T) error
	Supplier[T any] func() (T, error)
)

func HandleSup[T any](supplier Supplier[T], consumer Consumer[T]) error {
	if t, err := supplier(); err != nil {
		return err
	} else {
		return consumer(t)
	}
}
```


For the frontend, i've used [Angular](https://angular.io/) framework and [NgRx](https://ngrx.io/) to manage the state of the application.

To store the data, i've chosen [EdgeDB](https://edgedb.com/) as a database. It is a new database built on top of PostgreSQL. 
It is a very interesting database with a really nice and powerful query language. I highly recommend you to check it out.