import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
	let [todos, setTodos] = useState([]);
	let [current, setCurrent] = useState("");

	function handleChange(e) {
		e.preventDefault();
		setCurrent(e.target.value);
	}

	function updateTodos(e) {
		e.preventDefault();

		
		setTodos((prev) => [...prev, {todo: current, key:nanoid()}]);
		setCurrent("");
	}


  function deleteTodo(key){
    console.log()

    setTodos(prev =>{
      return prev.filter((todo)=> todo.key !== key )
    })
  }

	let todoElements =
		todos.length > 0
			? todos.map((todo) => (
					<li key={todo.key}>
						<input type="checkbox" id={todo.key} name={todo.key} value={todo.todo} />
						<label for={todo.key}>{todo.todo}</label>

						<span>
							<button onClick={()=> deleteTodo(todo.key)}>Delete</button>
						</span>
					</li>
			  ))
			: null;

	return (
		<main className="app">
			<form>
				<input
					type="text"
					placeholder="Enter Todo"
					onChange={handleChange}
					value={current}
					name="todo"
				/>

				<button onClick={updateTodos}>enter</button>
			</form>
			<ul>{todoElements}</ul>
		</main>
	);
}

export default App;
