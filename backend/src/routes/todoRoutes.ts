import { Router } from 'express';
import Todo, { ITodo } from '../models/Todo';

const router = Router();

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo
router.post('/', async (req, res) => {
  const lastTodo = await Todo.findOne().sort({ id: -1 });
  const nextId: Number = lastTodo ? lastTodo.id + 1 : 1;
  const newTodo: ITodo = new Todo({
    id: nextId,
    title: req.body.title,
  });
  await newTodo.save();
  res.json(newTodo);
});

// Update a todo
router.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findOneAndUpdate({ id: req.params.id }, { completed: req.body.completed });
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  await Todo.findOneAndDelete({ id: req.params.id });
  res.json({ message: 'Todo deleted' });
});

export default router;
