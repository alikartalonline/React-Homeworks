import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Loading from './Loading';
import ErrorRedux from './ErrorRedux';
import EmptyTodoList from './EmptyTodoList';
import { itemsLocked } from '../redux/todos/todosSlice';

import {
    // toggle, 
    // deleteTodos, 
    deleteTodoAsync,
    getTodosAsync,
    toggleTodoAsync
} from '../redux/todos/services';


function Section({ filteredTodos, isLoading, errorRedux }) {

    const dispatch = useDispatch();
    const activeFilter = useSelector(state => state.todos.activeFilter);
    const itemsLockedRedux = useSelector(itemsLocked);

    const handleDeleteTodos = async (id) => {
        if (window.confirm("Are you Sure?")) {
            await dispatch(deleteTodoAsync(id));
        }
    };

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    if (isLoading) {
        return <div><Loading /></div>
    };

    if (errorRedux) {
        return <ErrorRedux message={errorRedux} />
    };

    if (filteredTodos == "") {
        return <EmptyTodoList />
    }


    const handleToggle = async (id, isCompleted) => {
        await dispatch(toggleTodoAsync({ id, data: { isCompleted } }));
    }


    return (
        <div className='container'>
            <ul className='row mt-5'>

                {/* // REDUX LOCKED TODOS MAP START */}
                {
                    activeFilter === "All" ?
                        itemsLockedRedux.map((item, i) => (
                            <li key={i}
                                className="col-md-8  me-md-auto col-lg-6 mt-2"
                            >
                                <div className='d-flex '>

                                    <div className='form-check'>
                                        <input
                                            className="toggle m-2 form-check-input"
                                            type="checkbox" value="" id="flexCheckDefault"
                                            checked={item.isCompleted}
                                            onChange={() => alert("You can't change this list!")}
                                        />
                                    </div>

                                    <label
                                        className={item.isCompleted === true ?
                                            "text-decoration-line-through text-primary" : "text-dark"}
                                    >
                                        {item.content}
                                    </label>

                                    <button
                                        className={item.isCompleted === true ?
                                            "btn x-icon border border-0 text-danger" : "btn x-icon border border-0"}
                                        onClick={() => alert("You can't change this list!")}
                                    ></button>
                                </div>
                            </li>
                        ))
                        : null
                }
                {/* // REDUX LOCKED TODOS MAP FINISH */}


                {
                    // LOADING SPINNER BOOTSTRAP
                    filteredTodos === "" ?

                        <div className="spinner-border text-warning mt-5 ms-5" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :

                        // API TODOS MAP START
                        filteredTodos.map((todo, i) => (
                            <li key={i}
                                className="col-md-8  me-md-auto col-lg-6 mt-2"
                            >
                                <div className='d-flex '>

                                    <div className='form-check'>
                                        <input
                                            className="toggle m-2 form-check-input"
                                            type="checkbox" value="" id="flexCheckDefault"
                                            checked={todo.isCompleted}
                                            // onChange={() => dispatch(toggle({ id: todo.id }))}
                                            onChange={() => handleToggle(todo.id, !todo.isCompleted)}
                                        />
                                    </div>

                                    <label
                                        className={todo.isCompleted === true ?
                                            "text-decoration-line-through text-primary" : "text-dark"}
                                    >
                                        {todo.content}
                                    </label>

                                    <button
                                        className={todo.isCompleted === true ?
                                            "btn x-icon border border-0 text-danger" : "btn x-icon border border-0"}
                                        // onClick={() => deleteTodo(todo.id)}
                                        onClick={() => handleDeleteTodos(todo.id)}
                                    ></button>
                                </div>
                            </li>
                        ))
                    // TODOS MAP FINISH
                }

            </ul>
        </div>
    );
}

export default Section;