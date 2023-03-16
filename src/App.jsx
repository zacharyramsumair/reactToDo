import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { BiTrash } from "react-icons/bi";

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
			{ todo: current, key: nanoid(), checked: false },
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

	function checkTodo(key) {
		setTodos((prevTodos) => {
			return prevTodos.map((todo) => {
				return {
					...todo,
					checked: todo.key == key ? !todo.checked : todo.checked,
				};
			});
		});

		localStorage.setItem(
			"todos",
			JSON.stringify(todos.map((todo) => {
				return {
					...todo,
					checked: todo.key == key ? !todo.checked : todo.checked,
				};
			}))
			// JSON.stringify(todos.filter((todo) => todo.key !== key))
		);
	}

	let todoElements =
		todos.length > 0
			? todos.map((todo) => (
					<li key={todo.key}>
						<div>
						<input
							type="checkbox"
							checked={todo.checked}
							name=""
							id=""
							onClick={() => checkTodo(todo.key)}
							className="checkbox"
						/>

						<p style={{textDecoration : todo.checked ? "line-through" : "none" , color: todo.checked ? "var(--darkGrey)" : "var(--black)"  }}>{todo.todo}</p>
						</div>
						

						<span>
							<button
								className="delete"
								onClick={() => deleteTodo(todo.key)}
							>
								<BiTrash className="trash" />
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

					<button className="enter" onClick={updateTodos}>
						+
					</button>
				</form>
				<ul>{todoElements}</ul>
			</div>
		</main>
	);
}

export default App;
