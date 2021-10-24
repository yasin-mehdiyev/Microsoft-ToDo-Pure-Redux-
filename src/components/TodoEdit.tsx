import React, { useEffect } from 'react';
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from '../hooks/useTypedSelector';

const TodoEdit: React.FC<{ model: any, setModel: any, change:boolean, setChange: any, setShow: any }> = (props) => {

    const { editableTodo } = useTypedSelector(state => state.todo);
    const { fetchTodos, saveTodos } = useActions();

    const initialChange = () => {
        props.setModel({
            id: editableTodo.id,
            title: editableTodo.title,
            completed: editableTodo.completed,
        });
    };

    useEffect(() => {
        fetchTodos();
    }, [props.setChange, props.change]);

    
    useEffect(() => {
        initialChange();
    }, [editableTodo]);


    const handleChange = (name: string, val: any) => {
        props.setModel({...props.model, [name]: val});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (props.model.title.trim().length === 0) return;

        props.setChange(!props.change);
        saveTodos(props.model, "PUT");

        props.setModel({
            id: "",
            title: "",
            completed: false,
        });
        props.setShow();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="todo_title" className="mb-2">Title</label>
                    <input type="text" className="form-control" id="todo_title" placeholder="Enter todo" name="title" value={props.model.title} onChange={(e)=>handleChange(e.target.name,e.target.value)} />
                </div>
                <div className="form-check mb-2">
                    <label className="form-check-label" htmlFor="todo_status">Status</label>
                    <input type="checkbox" className="form-check-input" id="todo_status" name="completed" checked={props.model.completed} onChange={(e)=>handleChange(e.target.name,e.target.checked)} />
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <button type="submit" className="btn btn-primary">Edit Todo</button>
                </div>
            </form>
        </>
    )
}

export default TodoEdit
