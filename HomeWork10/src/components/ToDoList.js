import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle, destroy, SelectTodos, SelectFilteredTodos } from '../redux/todosSlice'

// let filtered = [];

function ToDoList() {

    const items = useSelector(SelectTodos)
    // const activeFilter = useSelector((state) => state.todos.activeFilter)

    const dispatch = useDispatch();

    const handleDestory = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(destroy(id))
        }
    }

    // filtered = items;

    // if (activeFilter !== "all") {
    //     filtered = items.filter((todo) => 
    //     activeFilter === "active" ? 
    //     todo.completed === false : 
    //     todo.completed === true)
    // }

    const filtetedItems = useSelector(SelectFilteredTodos);


    return (
        <ul className="todo-list">
            {
                filtetedItems.map((item) => (
                    <li key={item.id} className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => dispatch(toggle({ id: item.id }))}
                            />
                            <label>{item.title}</label>

                            <button
                                className="destroy"
                                onClick={() => handleDestory(item.id)}
                            ></button>


                            {/*  Confirm olmadan ise şu şekilde yapabiliriz butonu */}

                            {/* <button 
                            className="destroy"
                            onClick={() => dispatch(destroy(item.id))}
                            ></button> */}
                        </div>
                    </li>
                )
                )
            }
        </ul>
    )
}

export default ToDoList