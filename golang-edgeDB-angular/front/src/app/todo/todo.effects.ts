import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TodoService} from "./services/todo.service";
import {todoActions} from "./state-management/actions";
import {catchError, exhaustMap, map, of} from "rxjs";
import {FailureStep} from "./state-management/actions/update-error";

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {
  }

  getAll$ = createEffect(() => this.actions$.pipe(
      ofType(todoActions.loadTodosRequest),
      exhaustMap(() =>
        this.todoService.getAll().pipe(
          map(todos => todoActions.todosLoaded({todos})),
          catchError(error => of(todoActions.failureOccurred({
              error: error.error,
              step: FailureStep.CREATE
            }))
          )
        )
      ),
    )
  )

  createTodo$ = createEffect(() => this.actions$.pipe(
    ofType(todoActions.createTodoRequest),
    exhaustMap((props) =>
      this.todoService.create({label: props.label}).pipe(
        map(todo => todoActions.todoCreated({todo})),
        catchError(error => of(todoActions.failureOccurred({
            error: error.error,
            step: FailureStep.CREATE
          }))
        )
      )
    )))

  completeTodo$ = createEffect(() => this.actions$.pipe(
    ofType(todoActions.completeTodoRequest),
    exhaustMap((props) =>
      this.todoService.update(props.id, {
        completed: props.completed,
        label: props.label
      }).pipe(
        map(todo => todoActions.todoCompleted({todo})),
        catchError(error => of(todoActions.failureOccurred({
            error: error.error,
            step: FailureStep.UPDATE_COMPLETED
          }))
        )
      )
    )))

  updateTodoLabel$ = createEffect(() => this.actions$.pipe(
    ofType(todoActions.updateTodoLabelRequest),
    exhaustMap((props) =>
      this.todoService.update(props.id, {
        completed: props.completed,
        label: props.label
      }).pipe(
        map(todo => todoActions.todoLabelUpdated({todo})),
        catchError(error => of(todoActions.failureOccurred({
            error: error.error,
            step: FailureStep.UPDATE_LABEL
          }))
        )
      )
    )))

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(todoActions.deleteTodoRequest),
    exhaustMap((props) =>
      this.todoService.delete(props.id).pipe(
        map(_ => todoActions.todoDeleted({id: props.id})),
        catchError(error => of(todoActions.failureOccurred({
            error: error.error,
            step: FailureStep.DELETE
          }))
        )
      )
    )))
}
