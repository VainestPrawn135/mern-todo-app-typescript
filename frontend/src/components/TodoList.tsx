import React from 'react';
import API from '../api';
import { Todo } from '../types';

interface Props {
  todos: Todo[];
  fetchTodos: () => void;
}

const TodoList: React.FC<Props> = ({ todos, fetchTodos }) => {
  const toggleCompletion = async (id: number, completed: boolean) => {
    await API.put(`/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await API.delete(`/${id}`);
    fetchTodos();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
            onClick={() => toggleCompletion(todo.id, todo.completed)}
          >
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
