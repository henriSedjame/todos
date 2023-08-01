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

___

### 1 - Golang / Angular
    
- **Backend**: [Golang](https://golang.org/)
    
- **Frontend**: [Angular](https://angular.io/)

- **Database**: [EdgeDB](https://edgedb.com/)

In this example, i've used [Golang](https://golang.org/) as a backend language and [Fiber](https://gofiber.io/) framework to build the API.

For the frontend, i've used [Angular](https://angular.io/) framework and [NgRx](https://ngrx.io/) to manage the state of the application.

To store the data, i've chosen [EdgeDB](https://edgedb.com/) as a database. It is a new database built on top of PostgreSQL. 
It is a very interesting database with a really nice and powerful query language. I highly recommend you to check it out.