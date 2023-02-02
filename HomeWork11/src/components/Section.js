import React, { useEffect } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { toggle, deleteTodos } from '../redux/todos/todosSlice';

function Section({ filteredTodos }) {

    const disptach = useDispatch();

    const handleDeleteTodos = (id) => {
        if (window.confirm("Are you Sure?")){
            disptach(deleteTodos(id));
        }
    }


    // DELETE DATA FROM API
    // const deleteTodo = async (item) => {
    //     axios.delete(`https://630f37fc37925634188a39d5.mockapi.io/todos/${item}`)
    //     const newTodo = todos.filter(
    //         x => x.id !== item
    //     );
    //     setTodos(newTodo)
    // };


    // useEffect(() => {
    //     setTimeout(() => {
    //         for (let i = 0; i <= 15; i++) {
    //             axios.delete(`https://630f37fc37925634188a39d5.mockapi.io/todos/${i}`)
    //         }
    //     }, 30000)
    // }, [setTodos, todos]);


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
                                            onChange={() => disptach(toggle({id: todo.id}))}
                                        />
                                    </div>

                                    <label
                                        className={todo.isCompleted === true ?
                                            "text-decoration-line-through text-primary" : "text-dark"}
                                    >
                                        {todo.title}
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