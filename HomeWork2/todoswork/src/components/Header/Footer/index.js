
import React from 'react';

function Footer( 
  {
    todos, 
    filteredTodos, 
    addTodos, 
    updateCompleteTodos, 
    setActiveTodos, 
    activeTodos, 
    removeTodos
  })

  {


const clearItems = () => {
  addTodos([]);
};
// listeye eklenenleri tek tıkla "Clear Completed" butonu ile sildim

  return (

  <section className="main">

    <input 
    className="toggle-all" 
    type="checkbox"/>

		<label 
    htmlFor="toggle-all">
			Mark all as complete
		</label>

    <ul className="todo-list">
      {
        filteredTodos.map( (todos, i) => (
        <li  key={i} 
        className={todos.complete ? 'completed' : undefined}>
          <div className="view">
            <input 
              className="toggle" 
              type="checkbox"
              checked={todos.complete}
              onChange={() => updateCompleteTodos(todos.todolist)}
            />
              <label 
              className="borderbottom">
                {todos.todolist}
              </label>
            <button 
              className="destroy" 
              onClick={() => removeTodos(todos.todolist)}
            />
          </div>
      </li>
      ))
      }
    </ul>


    <footer className="footer">
  
		<span className="todo-count"><strong>{todos.length}</strong> items left </span>

		<ul className="filters">
			<li>
				<a 
        onClick={(e) => {setActiveTodos("All")} }
        className={activeTodos === "All" ? 'selected' : undefined} 
        >All</a>
			</li>
			<li>
      <a 
        onClick={(e) => {setActiveTodos("Active")} }
        className={activeTodos === "Active" ? 'selected' : undefined} 
        >Active</a>
			</li>
			<li>
      <a 
        onClick={(e) => {setActiveTodos("Completed")} }
        className={activeTodos === "Completed" ? 'selected' : undefined} 
        >Completed</a>
			</li>
		</ul>

	
		<button 
      className="clear-completed" 
      onClick={clearItems}>
      Clear completed
		</button>

	</footer>
</section>
  );
}

export default Footer;



