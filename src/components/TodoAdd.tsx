import React, { useEffect, useRef, useState } from 'react';
import { useActions } from "../hooks/useActions";
import { v4 as uuidv4 } from 'uuid';

const TodoAdd: React.FC<{change: boolean, setChange: any, setShow: any}> = (props) => {

    const { fetchTodos, saveTodos } = useActions()
    const [status, setStatus] = useState(false);
    const addedTextRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchTodos();
    }, [props.setChange, props.change]);

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.checked);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const addedText = addedTextRef.current!.value;

        if (addedText.trim().length === 0) return;

        const data: any = {
            id: uuidv4(),
            title: addedText,
            completed: status,
        };

        props.setChange(!props.change);

        saveTodos(data, "POST");

        addedTextRef.current!.value = '';
        setStatus(false);
        props.setShow();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="todo_title" className="mb-2">Title</label>
                    <input type="text" className="form-control" id="todo_title" placeholder="Enter todo" ref={addedTextRef} />
                </div>
                <div className="form-check mb-2">
                    <label className ="form-check-label" htmlFor="todo_status">Status</label>
                    <input type="checkbox" className="form-check-input" id="todo_status" checked={status} onChange={handleChangeStatus} />
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <button type="submit" className="btn btn-primary">Add Todo</button>
                </div>
            </form>
        </>
    )
}

export default TodoAdd
