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
    },
    reducers: {
        newTodo: (state, action) => {
            state.itemsRedux.push(action.payload);
        }
    },
});

export const { newTodo } = todosSlice.actions;
export default todosSlice.reducer;