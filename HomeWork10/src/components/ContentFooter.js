import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFilter, clearCompleted, SelectTodos, selectActiveFilter } from '../redux/todosSlice';

function ContentFooter() {

    // const items = useSelector((state) => state.todos.items)
    const items = useSelector(SelectTodos)
    
    const itemsLeft = items.filter((item) => !item.completed).length;

    // const activeFilter = useSelector((state) => state.todos.activeFilter)
    const activeFilter = useSelector(selectActiveFilter)

    const dispatch = useDispatch();

    return (
        <footer className="footer">

            <span className="todo-count">
                <strong>{itemsLeft}</strong> {" "}
                {
                    itemsLeft == 1 ? "item left" :
                        itemsLeft == 0 ? "item" :
                            "items left"
                }

                {/* veya şu şekilde de yazabilirük,
                itemsLeft 1'den büyükse,"item"in yanına "s" ekle dedik.
                item{itemsLeft > 1 && "s"} left */}
            </span>

            <ul className="filters">
                <li>
                    <a
                        href='#/'
                        className={activeFilter === "all" ? "selected" : ""}
                        onClick={() => dispatch(changeActiveFilter("all"))}
                    >All</a>
                </li>
                <li>
                    <a
                        href='#/' className={activeFilter === "active" ? "selected" : ""}
                        onClick={() => dispatch(changeActiveFilter("active"))}
                    >Active</a>
                </li>
                <li>
                    <a
                        href='#/'
                        className={activeFilter === "completed" ? "selected" : ""}
                        onClick={() => dispatch(changeActiveFilter("completed"))}
                    >Completed</a>
                </li>
            </ul>

            <button 
            className="clear-completed"
            onClick={() => dispatch(clearCompleted())}
            >
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter