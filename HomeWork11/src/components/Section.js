import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Loading from './Loading';
import ErrorRedux from './ErrorRedux';
import EmptyTodoList from './EmptyTodoList';

import {
    // toggle, 
    // deleteTodos, 
    deleteTodoAsync,
    getTodosAsync,
    toggleTodoAsync
} from '../redux/todos/services';


function Section({ filteredTodos, isLoading, errorRedux }) {

    const dispatch = useDispatch();

    const handleDeleteTodos = async (id) => {
        if (window.confirm("Are you Sure?")) {
            await dispatch(deleteTodoAsync(id));
        }
    };

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    // useEffect(() => {
    //     setTimeout(() => {
    //         for (let i = 0; i <= 15; i++) {
    //             axios.delete(`https://630f37fc37925634188a39d5.mockapi.io/todos/${i}`)
    //         }
    //     }, 30000)
    // }, [setTodos, todos]);

    if (isLoading) {
        return <div><Loading /></div>
    };

    if (errorRedux) {
        return <ErrorRedux message={errorRedux} />
    };

    if(filteredTodos == ""){
        return <EmptyTodoList />
    }


    const handleToggle = async (id, isCompleted) => {
        await dispatch(toggleTodoAsync({ id, data: { isCompleted } }));
    }


    return (
        <div className='container'>
            <ul className='row mt-5'>

                {
                    // LOADING SPINNER BOOTSTRAP
                    filteredTodos === "" ?

                        <div className="spinner-border text-warning mt-5 ms-5" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :

                        // TODOS MAP START
                        filteredTodos.map((todo, i) => (
                            <li key={i}
                                className="col-md-8  me-md-auto     col-lg-6 mt-2"
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