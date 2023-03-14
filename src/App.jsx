import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {

	let [todos, setTodos] = useState([]);
	let [current, setCurrent] = useState("");


  useEffect(() => {
    console.log("getting")
    if(localStorage.getItem("todos")){
      setTodos(JSON.parse(localStorage.getItem("todos")))

    }
  }, []);




	function handleChange(e) {
		e.preventDefault();
		setCurrent(e.target.value);
	}
	function handleCheck(key) {
		// e.preventDefault();
    // setTodos((prev) => [...prev, {todo: current, key:nanoid(), checked:!{}}]);
    
	}

	function updateTodos(e) {
		e.preventDefault();

		
		setTodos((prev) => [...prev, {todo: current, key:nanoid(), checked:false}]);
    localStorage.setItem('todos', JSON.stringify(todos));
    // setLocalStorage()


		setCurrent("");
	}


  function deleteTodo(key){
    console.log(todos)

    setTodos(prev =>{
      return prev.filter((todo)=> todo.key !== key )
    })

    // setLocalStorage(JSON.stringify(todos.filter((todo)=> todo.key !== key)))
    localStorage.setItem('todos', JSON.stringify(todos.filter((todo)=> todo.key !== key)));
  }

	let todoElements =
		todos.length > 0
			? todos.map((todo) => (
					<li key={todo.key}>
						<input type="checkbox" id={todo.key} name={todo.key} checked={todo.checked} onChange={()=> handleCheck(key)} />
						<label htmlFor={todo.key}>{todo.todo}</label>

            {/* {todo.todo} */}

						<span>
							<button onClick={()=> deleteTodo(todo.key)}>Delete</button>
						</span>
					</li>
			  ))
			: null;


  // function setLocalStorage(){
  //   console.log(todos)
  //   localStorage.setItem('todos', JSON.stringify(todos));

  // }




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
