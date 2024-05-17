const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/todos', todoRoutes);

// Sincronizar os modelos e iniciar o servidor
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});