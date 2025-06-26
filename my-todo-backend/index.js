

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors());

let todos = []; // Simula base de dados na RAM

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome!' });
});

// GET todas as tarefas
app.get('/api/todos', (req, res) => res.json(todos));

// POST nova tarefa
app.post('/api/todos', (req, res) => {
  const { todo } = req.body;
  const newTodo = { id: Date.now(), todo, isDone: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE tarefa
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.status(204).send();
});

// PUT (opcional: marcar tarefa como feita)
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { isDone } = req.body;
  todos = todos.map((t) =>
    t.id === id ? { ...t, isDone: isDone !== undefined ? isDone : t.isDone } : t
  );
  res.status(200).json({ message: "Updated" });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

process.on('unhandledRejection', console.error);
