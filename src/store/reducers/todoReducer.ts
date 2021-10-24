import {TodoAction, TodoActionTypes, TodoState} from "../../types/todo";

const initialState: TodoState = {
    todos: [],
    editableTodo: {}
}

export const todoReducer = (state = initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TODOS_SUCCESS:
            return {...state, todos: action.payload};
        case TodoActionTypes.FETCH_EDITABLE_DATA:
            const data: any = { ...state.editableTodo, ...action.payload};
            return {...state, editableTodo: data };
        default:
            return state
    }
}