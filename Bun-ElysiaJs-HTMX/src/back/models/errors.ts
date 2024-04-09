

export enum ErrorType {
    TODO_NOT_FOUND = 'TODO_NOT_FOUND',
    TODO_ALREADY_EXISTS = 'TODO_ALREADY_EXISTS',
    TODO_FAILED_TO_SAVE = 'TODO_FAILED_TO_SAVE',
    TODO_FAILED_TO_UPDATE = 'TODO_FAILED_TO_UPDATE',
    TODO_FAILED_TO_DELETE = 'TODO_FAILED_TO_DELETE'
}


export type TodoData = 'id' | 'label';

class TodoError extends Error {
    constructor( type: ErrorType,  data?: string) {
        switch (type) {
            case ErrorType.TODO_NOT_FOUND:
                super(`Todo not found with id: ${data}`);
                break;
            case ErrorType.TODO_ALREADY_EXISTS:
                super(`Todo already exists with label: ${data}`);
                break;
            case ErrorType.TODO_FAILED_TO_SAVE:
                super('Failed to save todo');
                break;
            case ErrorType.TODO_FAILED_TO_UPDATE:
                super(`Failed to update todo with id : ${data}`);
                break;
            case ErrorType.TODO_FAILED_TO_DELETE:
                super(`Failed to delete todo with id : ${data}`);
                break;

            default:
                super('Unknown error');
        }
    }
}

export class TodoAlreadyExistError extends TodoError {
    constructor(label: string) {
        super(ErrorType.TODO_ALREADY_EXISTS, label);
    }
}

export class TodoNotFoundError extends TodoError {
    constructor(id: string) {
        super(ErrorType.TODO_NOT_FOUND, id);
    }
}

export class TodoFailedToSaveError extends TodoError {
    constructor() {
        super(ErrorType.TODO_FAILED_TO_SAVE);
    }
}

export class TodoFailedToUpdateError extends TodoError {
    constructor(id: string) {
        super(ErrorType.TODO_FAILED_TO_UPDATE, id);
    }
}

export class TodoFailedToDeleteError extends TodoError {
    constructor(id: string) {
        super(ErrorType.TODO_FAILED_TO_DELETE, id);
    }
}