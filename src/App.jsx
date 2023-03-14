import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { BiTrash } from 'react-icons/bi';


function App() {
	let [todos, setTodos] = useState([]);
	let [current, setCurrent] = useState("");

	useEffect(() => {
		console.log("getting");
		if (localStorage.getItem("todos")) {
			setTodos(JSON.parse(localStorage.getItem("todos")));
		}
	}, []);

	function handleChange(e) {
		e.preventDefault();
		setCurrent(e.target.value);
	}


	function updateTodos(e) {
		e.preventDefault();

		setTodos((prev) => [
			...prev,
			{ todo: current, key: nanoid() },
		]);
		localStorage.setItem("todos", JSON.stringify(todos));
		// setLocalStorage()

		setCurrent(" ");
	}

	function deleteTodo(key) {
		console.log(todos);

		setTodos((prev) => {
			return prev.filter((todo) => todo.key !== key);
		});

		// setLocalStorage(JSON.stringify(todos.filter((todo)=> todo.key !== key)))
		localStorage.setItem(
			"todos",
			JSON.stringify(todos.filter((todo) => todo.key !== key))
		);
	}

	let todoElements =
		todos.length > 0
			? todos.map((todo) => (
					<li key={todo.key}>
						

						{todo.todo}

						<span>
							<button className="delete" onClick={() => deleteTodo(todo.key)}>
								<BiTrash className="trash"/>
							</button>
						</span>
					</li>
			  ))
			: null;



	return (
		<main className="app">
			<h1>Todo App</h1>
      <div className="container">
      <form>
				<input
					type="text"
					placeholder="Enter Todo"
					onChange={handleChange}
					value={current}
					name="todo"
				/>

				<button className="enter" onClick={updateTodos}>+</button>
			</form>
			<ul>{todoElements}</ul>
      </div>
			
		</main>
	);
}

export default App;
