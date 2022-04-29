import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { addTodo } from '../redux/todosSlice'
import { nanoid } from '@reduxjs/toolkit'

function Form() {


    const [title, setTitle] = useState("")

    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title) return; // inputu boş şekilde gönderirsek bir şey eklemeyecek listeye

        dispatch(addTodo({ id: nanoid(), title, completed: false }))

        setTitle(""); // inputa verilen girildikten sonra temizlensin input
    }


    return (
        <form onSubmit={handleSubmit}>
            <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            
            />
        </form>
    )
}

export default Form