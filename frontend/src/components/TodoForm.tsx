import React, { useState } from 'react';
import API from '../api';

interface Props {
  fetchTodos: () => void;
}

const TodoForm: React.FC<Props> = ({ fetchTodos }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await API.post('/', { title });
    setTitle('');
    fetchTodos();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
