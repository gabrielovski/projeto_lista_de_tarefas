const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Criar uma nova tarefa
router.post('/', async (req, res) => {
  try {
    const newTodo = await Todo.create({ text: req.body.text });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Tarefa não encontrada' });

    todo.text = req.body.text || todo.text;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deletar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Tarefa não encontrada' });

    await todo.destroy();
    res.json({ message: 'Tarefa deletada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;