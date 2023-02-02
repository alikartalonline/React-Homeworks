import React from 'react'

import { useDispatch } from 'react-redux';
import { changeActiveFilter, clearCompleted } from '../redux/todos/todosSlice';

function Footer() {

  const disptach = useDispatch();

  return (
    <footer style={{ marginTop: "20%" }} className="sticky-bottom">
        <button className='btn btn1 text-white' onClick={() => disptach(changeActiveFilter("All"))}>All</button>
        <button className='btn btn2 border-0' onClick={() => disptach(changeActiveFilter("Active"))}>Active</button>
        <button className='btn btn3' onClick={() => disptach(changeActiveFilter("Completed"))}>Completed</button>
        <button className='btn btn-outline-danger btn-sm m-1 rounded-pill' onClick={() => disptach(clearCompleted())} >Clear</button>
    </footer>
  )
}

export default Footer;