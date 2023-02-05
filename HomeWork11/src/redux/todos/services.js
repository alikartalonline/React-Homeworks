import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';



export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_MOCKAPI_IO}/todos`);
    return res.data;

    // Alternative Fetch()
    //     const res = await fetch(`${process.env.REACT_APP_MOCKAPI_IO}/todos`);
    //     return await res.json();
});

export const addTodosAsync = createAsyncThunk('todos/addTodosAsync', async (data) => { // data => new todo
    const res = await axios.post(`${process.env.REACT_APP_MOCKAPI_IO}/todos`, data);
    return res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({ id, data }) => { // data => güncellenmek istenen todo'nun id'si (true/false)
    const res = await axios.patch(`${process.env.REACT_APP_MOCKAPI_IO}/todos/${id}`, data);
    return res.data;
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (id) => {
    await axios.delete(`${process.env.REACT_APP_MOCKAPI_IO}/todos/${id}`);
    return id;
});
