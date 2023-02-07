import { createSlice, nanoid } from '@reduxjs/toolkit';

import {
    getTodosAsync,
    addTodosAsync,
    toggleTodoAsync,
    deleteTodoAsync,
} from './services';

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        itemsRedux: [],
        itemsLocked: [
            {
                id: "100",
                content: "Learn React",
                isCompleted: true,
            },
            {
                id: "101",
                content: "Learn Redux",
                isCompleted: false,
            }
        ],
        isLoading: false,
        error: null,
        // activeFilter: "All",
        activeFilter: (localStorage.getItem("activeFilter") || "All"), // Sayfa "All" - "Active" - "Completed" seçeneklerinin hangisiyle kapatıldıysa, tekrar açıldığında ana ekran o seçenekle açılıyor.
        addNewTodo: {
            isLoading: false,
            error: null,
        }
    },
    reducers: {

        // ***** verileri Api'den çekip, Api'ye post olarak ekleyeceğim için burası (newTodo) artık gerekmiyor. *****
        newTodo: {
            reducer: (state, action) => {
                state.itemsRedux.push(action.payload)
            },
            prepare: ({ content }) => {
                // "Homepage">> "disptach(newTodo({  content,  }));" ettikten sonra "content" payload olarak gönderilip,
                // "prepare: ({ content })" içine düşüyor ve aşağıdaki "payload" return ediliyor, 
                // ve yukarıdaki "reducer: (state, action)" içindeki "action"a düşüyor, 
                // ve biz de action altındaki payload'ı kullanarak state elemanı ekliyorum.
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

        // toggle: (state, action) => {     // axios.patch() sonrasında buraya (toggle) ihtiyacımız yok.
        //     const { id } = action.payload;

        //     const item = state.itemsRedux.find(item => item.id === id); // find id
        //     item.isCompleted = !item.isCompleted; // id === true ? false : true
        // },

        // deleteTodos: (state, action) => {    // deleteTodoAsync() ile APi'den sildiğimiz için artık buraya ihtiyacımız yok
        //     const id = action.payload;

        //     const filtered = state.itemsRedux.filter((item) => item.id !== id);
        //     state.itemsRedux = filtered;
        // },

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
            // Get todos
            .addCase(getTodosAsync.pending, (state) => {
                state.isLoading = true; // pending yani bekleme durumunda isLoading = true olacak!
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.itemsRedux = action.payload
                state.isLoading = false;
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Add todo
            .addCase(addTodosAsync.pending, (state) => {
                state.addNewTodo.isLoading = true;
            })
            .addCase(addTodosAsync.fulfilled, (state, action) => {
                state.itemsRedux.push(action.payload);
                state.addNewTodo.isLoading = false;
            })
            .addCase(addTodosAsync.rejected, (state, action) => {
                state.addNewTodo.isLoading = false;
                state.addNewTodo.error = action.error.message;
            })

            // Toggle todo
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, isCompleted } = action.payload;
                // Buradaki veriler: section.js > await disptach(toggleTodoAsync({ id, data: { isCompleted } })); 

                const index = state.itemsRedux.findIndex(item => item.id === id);
                // Yukarıdaki seçtiğimiz id'li elemanın state.itemsRedux içinde hangi index'te olduğunu bulmam gerekiyor.

                state.itemsRedux[index].isCompleted = isCompleted;
                // Seçilen index numaralı elemanın "isCompleted" türünü toggleTodoAsync ile belirlediğim "isCompleted" türü ile değiştir.
            })

            // Delete todo 
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const id = action.payload;
                const filtered = state.itemsRedux.filter(item => item.id !== id);
                state.itemsRedux = filtered;
            })

    },
});
 
export const selectTodos = (state) => state.todos.itemsRedux; 
// Component içinde uzun uzun  yazmak yerine "selecTodos" olarak import edip, useSelector(selectTodos) ile kullanabilirim.

export const itemsLocked = (state) => state.todos.itemsLocked; 

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