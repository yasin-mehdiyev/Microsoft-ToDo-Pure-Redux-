import {Dispatch} from "redux";
import axios from "axios";
import {TodoAction, TodoActionTypes} from "../../types/todo";
import { proxy } from "../../utilities/baseUrl";

export const fetchTodos = () => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const response: any = await axios.get(`${proxy}/todos`);
            setTimeout(() => {
                dispatch({type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: response.data})
            }, 500)
        } catch (error) {
            console.log('error', error);
        }
    }
};

export const saveTodos = (data: any, method: string) => {
    return async () => {
        try {
            if (method === 'POST') {
                await axios.post(`${proxy}/todos`, data);
            }
            else{
                await axios.put(`${proxy}/todos/${data.id}`, data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }
};

export const deletedTodo = (todoId: string) => {
    return async () => {
        try {
            await axios.delete(`${proxy}/todos/${todoId}`);
        } catch (error) {
            console.log('error', error);
        }
    }
};

export const fetchEditableTodo = (editId: any) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.FETCH_TODOS})
            const response: any = await axios.get(`${proxy}/todos/${editId}`);
            setTimeout(() => {
                dispatch({type: TodoActionTypes.FETCH_EDITABLE_DATA, payload: response.data})
            }, 500)
        } catch (error) {
            console.log('error', error);
        }
    }
};