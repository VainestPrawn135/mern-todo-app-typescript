import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5000/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });

    setNewTodo("");
    fetchTodos();
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">MERN Todo App (TypeScript)</h1>

      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-primary" onClick={addTodo}>
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
      </div>

      <ul className="list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`box ${todo.completed ? "has-background-success-light" : ""}`}
          >
            <div className="is-flex is-justify-content-space-between">
              <span>{todo.title}</span>
              <div>
                <button
                  className="button is-small is-info mr-2"
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                >
                  <i className={`fas ${todo.completed ? "fa-undo" : "fa-check"}`}></i>
                {`${todo.completed ? "Completed" : "Undone"}`}
                </button>
                <button
                  className="button is-small is-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
