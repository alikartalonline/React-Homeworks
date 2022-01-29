
import { useState } from 'react'; 

import './todos.css' //todos için açtığım css dosyasını import ettim

import Section from './Section'; // Component/Header içinde oluşturduğum Section
import Footer from './Footer'; // Component/Header içinde oluşturduğum Footer

function Todos() {

const [todos, setTodos] = useState([
        {
            todolist: "Learn JavaScript"
        },{
            todolist: "Learn React"
        },{
            todolist: "Have a life!"
        },{
            todolist: "Fall in love..."
        },
])
// Birden fazla elemanı tutmak istediğim için useState([]) şeklinde kullandım


// , () => {
//     const savedTodos = localStorage.getItem("todos")
//     return JSON.parse(savedTodos)
// }) 


const [activeTodos, setActiveTodos] = useState("All");
           
const removeTodos=(todolist)=>{
    const filtered = todos.filter(item=>item.todolist !== todolist)
    setTodos(filtered);
  } // çarpı ikonuna tıklandığında todolist elementleri silinecek


let filteredTodos = 
activeTodos === "All" ? todos 
: activeTodos === "Active" ? todos.filter(item => item.complete === false)
: todos.filter(item => item.complete === true)


const updateCompleteTodos=(todolist)=>{
    const index = todos.findIndex(item => item.todolist === todolist);
    const todo = todos.find(item => item.todolist === todolist);
    todo.complete = !todo.complete
    const newTodos = [...todos];
    newTodos[index] = todo;
    setTodos(newTodos);
  }



  return (

  <div id="todoapp">

        <Section 
        addTodos={setTodos} 
        todos={todos} 
        />

        <Footer 
        updateCompleteTodos={updateCompleteTodos} 
        activeTodos={activeTodos}  
        setActiveTodos={setActiveTodos} 
        removeTodos={removeTodos}  
        filteredTodos={filteredTodos} 
        addTodos={setTodos} 
        todos={todos} 
        />

  </div>
  )
}

export default Todos;




