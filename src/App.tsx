import React from 'react';
import TodoList from "./components/TodoList";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div>
            <TodoList/>
            <hr/>
        </div>
    );
};

export default App;