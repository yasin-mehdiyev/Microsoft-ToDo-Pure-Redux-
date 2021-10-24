import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import TodoAdd from './TodoAdd';
import TodoEdit from './TodoEdit';
import { classes } from '../utilities/styledClasses';

const TodoList: React.FC = () => {
    const { todos } = useTypedSelector(state => state.todo);
    const { fetchTodos, deletedTodo, fetchEditableTodo } = useActions();

    const [show, setShow] = useState(false);
    const [editable, setEditable] = useState(false);
    const [change, setChange] = useState(false);

    const [model, setModel] = useState({
        id: '',
        title: '',
        completed: false,
    });

    useEffect(() => {
        fetchTodos();
    }, [setChange, change]);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        setEditable(false);
        setModel({
            id: '',
            title: '',
            completed: false,
        })
    };

    const handleShowEditModal = (id: string) => {
        fetchEditableTodo(id);
        setEditable(true);
        setShow(true);
    };

    const handleDelete = (id: string) => {
        setChange(!change);
        deletedTodo(id);
    };

    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <div className="row mt-3 mb-2">
                        <div className="col-md-12 d-flex justify-content-end align-items-center">
                            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">Add New Todo</Button>
                        </div>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-10">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col" className="text-center">Status</th>
                                        <th scope="col" className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todos.map((todo, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{todo.title}</td>
                                                <td className="text-center">
                                                    <input type="checkbox" checked={todo.completed}  disabled />
                                                </td>
                                                <td style={classes.actionButtons}>
                                                    <span style={classes.editButton} onClick={() => handleShowEditModal(todo.id)}><AiOutlineEdit /></span>
                                                    <span style={classes.deleteButton} onClick={()=> handleDelete(todo.id)}><AiOutlineDelete /></span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            editable ? "Edit Todo" : "Add Todo"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        editable ? <TodoEdit model={model} setModel={setModel} change={change} setChange={setChange} setShow={setShow} /> : <TodoAdd change={change} setChange={setChange} setShow={setShow} />
                    }
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default TodoList;