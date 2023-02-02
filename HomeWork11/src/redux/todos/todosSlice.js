import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        itemsRedux: [
            {
                id: "100",
                title: "Learn React",
                isCompleted: true,
            },
            {
                id: "101",
                title: "Learn Redux",
                isCompleted: false,
            }
        ],
        activeFilter: "All",
    },
    reducers: {
        newTodo: (state, action) => {
            state.itemsRedux.push(action.payload);
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
});

export const selectTodos = (state) => state.todos.itemsRedux;

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "All") {
        return state.todos.itemsRedux;
    }

    return state.todos.itemsRedux.filter((x) => state.todos.activeFilter === "Active" ? x.isCompleted === false : x.isCompleted === true);
}

export const { newTodo, toggle, deleteTodos, changeActiveFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;