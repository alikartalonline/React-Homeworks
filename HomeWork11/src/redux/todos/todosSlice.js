import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
})

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
        addNewTodoLoading: false,
        addNewTodoError: null,
        activeFilter: "All",
    },
    reducers: {

        // ***** verileri Api'den çekip, Api'ye post olarak ekleyeceğim için burası (newTodo) artık gerekmiyor. *****
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
        // ***** verileri Api'den çekip, Api'ye post olarak ekleyeceğim için burası (newTodo) artık gerekmiyor. *****

        // axios.patch() sonrasında buraya (toggle) ihtiyacımız yok.
        // toggle: (state, action) => { 
        //     const { id } = action.payload;

        //     const item = state.itemsRedux.find(item => item.id === id); // find id
        //     item.isCompleted = !item.isCompleted; // id === true ? false : true
        // },
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

            // get todos
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

            // add todo
            .addCase(addTodosAsync.pending, (state) => {
                state.addNewTodoLoading = true;
            })
            .addCase(addTodosAsync.fulfilled, (state, action) => {
                state.itemsRedux.push(action.payload);
                state.addNewTodoLoading = false;
            })
            .addCase(addTodosAsync.rejected, (state, action) => {
                state.addNewTodoLoading = false;
                state.addNewTodoError = action.payload.message;
            })

            // toggle todo
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, isCompleted } = action.payload; // section.js > await disptach(toggleTodoAsync({ id, data: { isCompleted } })); Buradaki veriler.
                const index = state.itemsRedux.findIndex(item => item.id === id); // Yukarıdaki seçtiğimiz id'li elemanın state.itemsRedux içinde hangi index'te olduğunu bulmam gerekiyor.
                state.itemsRedux[index].isCompleted = isCompleted; // Seçilen index numaralı elemanın "isCompleted" türünü toggleTodoAsync ile belirlediğim "isCompleted" türü ile değiştir.
            })
    },
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
    clearCompleted,
    addNewTodoLoading,
    addNewTodoError,
} = todosSlice.actions;

export default todosSlice.reducer;