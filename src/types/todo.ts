export interface TodoState {
    todos: any[],
    editableTodo: any
}

export enum TodoActionTypes {
    FETCH_TODOS= 'FETCH_TODOS',
    FETCH_TODOS_SUCCESS= 'FETCH_TODOS_SUCCESS',
    FETCH_EDITABLE_DATA= 'FETCH_EDITABLE_DATA',
}
interface FetchTodoAction {
    type: TodoActionTypes.FETCH_TODOS
};

interface FetchEditableTodoAction {
    type: TodoActionTypes.FETCH_EDITABLE_DATA,
    payload: any,
};

interface FetchTodoSuccessAction {
    type: TodoActionTypes.FETCH_TODOS_SUCCESS;
    payload: any[];
}

export type TodoAction =
    FetchTodoAction
    | FetchTodoSuccessAction
    | FetchEditableTodoAction