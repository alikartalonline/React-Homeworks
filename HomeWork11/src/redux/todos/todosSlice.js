import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios('https://630f37fc37925634188a39d5.mockapi.io/todos');
    return res.data;

    // Alternative Fetch()
    //     const res = await fetch('https://630f37fc37925634188a39d5.mockapi.io/todos');
    //     return await res.json();
});


export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        itemsRedux: [
            // {
            //     id: "100",
            //     content: "Learn React",
            //     isCompleted: true,
            // },
            // {
            //     id: "101",
            //     content: "Learn Redux",
            //     isCompleted: false,
            // }
        ],
        isLoading: false,
        error: null,
        activeFilter: "All",
    },
    reducers: {
        newTodo: {
            reducer: (state, action) => {
                state.itemsRedux.push(action.payload)
            },
            prepare: ({ content }) => { // "Homepage">> "disptach(newTodo({  content,  }));" ettikten sonra "content" payload olarak gönderilip "prepare: ({ content })" içine düşüyor ve aşağıdaki "payload" return ediliyor ve yukarıdaki "reducer: (state, action)" içindeki "action"a düşüyor ve biz de action altındaki payload'ı kullanarak state elemanı ekliyorum.
                return {
                    payload: {
                        id: nanoid(),
                        isCompleted: false,
                        content,
                    }
                }
            }
        },
        toggle: (state, action) => {
            const { id } = action.payload;

            const item = state.itemsRedux.find(item => item.id === id); // find id
            item.isCompleted = !item.isCompleted; // id === true ? false : true
        },
        deleteTodos: (state, action) => {
            const id = action.payload;

            const filtered = state.itemsRedux.filter((item) => item.id !== id);
            state.itemsRedux = filtered;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.itemsRedux.filter(item => item.isCompleted === false)
            state.itemsRedux = filtered;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getTodosAsync.pending, (state) => {
                state.isLoading = true; // pending yani bekleme durumunda isLoading = true olacak!
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.itemsRedux = action.payload;
                state.isLoading = false;
                // state.itemsRedux = state.itemsRedux.concat(action.payload)
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            })
    }
});

export const selectTodos = (state) => state.todos.itemsRedux;

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "All") {
        return state.todos.itemsRedux;
    }

    return state.todos.itemsRedux.filter((x) => state.todos.activeFilter === "Active" ?
        x.isCompleted === false : x.isCompleted === true);
}

export const {
    newTodo,
    toggle,
    deleteTodos,
    changeActiveFilter,
    clearCompleted
} = todosSlice.actions;

export default todosSlice.reducer;