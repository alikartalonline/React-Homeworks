import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeActiveFilter, clearCompleted } from '../redux/todos/todosSlice';
import { deleteTodoAsync } from '../redux/todos/services';

function Footer({ filteredTodos }) {

  const dispatch = useDispatch();
  const activeFilter = useSelector(state => state.todos.activeFilter);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  const handleDeleteTodosAll = () => {
    if (window.confirm("Are you Sure? All the lists you marked will be deleted!")) {
      const clearItems = filteredTodos.filter(todo => todo.isCompleted === true)
      clearItems.filter(async (item) => {
        await dispatch(deleteTodoAsync(item.id));
      });
    }
  };



  return (
    <footer style={{ marginTop: "20%" }} className="sticky-bottom">

      {/* 'All' Button  */}
      <button
        className={activeFilter === "All" ? 'btn btn1 text-white xbx fw-bold' : 'btn btn1 text-white xbx'}
        onClick={() => dispatch(changeActiveFilter("All"))}
      >
        All
      </button>
      {/* 'All' Button  */}


      {/* 'Active' Button  */}
      <button
        className={activeFilter === "Active" ? 'btn btn2 border-0 fw-bold' : 'btn btn2 border-0'}
        onClick={() => dispatch(changeActiveFilter("Active"))}
      >
        Active
      </button>
      {/* 'Active' Button  */}


      {/* 'Completed' Button  */}
      <button
        className={activeFilter === "Completed" ? 'btn btn3 fw-bold' : 'btn btn3'}
        onClick={() => dispatch(changeActiveFilter("Completed"))}
      >
        Completed
      </button>
      {/* 'Completed' Button  */}


      {/* 'Clear' Button  */}
      <button className='btn btn-outline-danger btn-sm m-1 rounded-pill'
        onClick={() => handleDeleteTodosAll()}
      >
        Clear
      </button>
      {/* 'Clear' Button  */}


    </footer>
  );
}

export default Footer;