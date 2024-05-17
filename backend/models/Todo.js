const { DataTypes } = require('sequelize');
const db = require('./index');

const Todo = db.sequelize.define('Todo', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Todo;