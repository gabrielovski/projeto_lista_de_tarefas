const apiUrl = 'http://localhost:5000/api/todos';

// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const fetchTodos = async () => {
  try {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    todos.forEach(todo => addTodoToDOM(todo));
  } catch (err) {
    console.error('Erro ao buscar tarefas:', err);
  }
}

const addTodoToDOM = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todo.completed) {
    todoDiv.classList.add("done");
  }

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = todo.text;
  todoDiv.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todoDiv.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todoDiv.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todoDiv.appendChild(deleteBtn);

  todoDiv.setAttribute('data-id', todo.id);

  todoList.appendChild(todoDiv);
}

const saveTodo = async (text) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    const newTodo = await response.json();
    addTodoToDOM(newTodo);
    todoInput.value = ""; // Limpar o campo de entrada
    todoInput.focus(); // Focar no campo de entrada
  } catch (err) {
    console.error('Erro ao salvar tarefa:', err);
  }
}

const updateTodo = async (id, text, completed) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, completed })
    });
    const updatedTodo = await response.json();
    // Atualizar o DOM conforme necessário
    document.querySelector(`[data-id='${id}'] h3`).innerText = updatedTodo.text;
    const todoDiv = document.querySelector(`[data-id='${id}']`);
    if (updatedTodo.completed) {
      todoDiv.classList.add("done");
    } else {
      todoDiv.classList.remove("done");
    }
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
  }
}

const deleteTodo = async (id) => {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    document.querySelector(`[data-id='${id}']`).remove();
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
  }
}

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;
  let todoId;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
    todoId = parentEl.getAttribute('data-id');
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    updateTodo(todoId, todoTitle, parentEl.classList.contains("done"));
  }

  if (targetEl.classList.contains("remove-todo")) {
    deleteTodo(todoId);
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
    editForm.setAttribute('data-id', todoId);
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value;
  const todoId = editForm.getAttribute('data-id');
  if (editInputValue) {
    updateTodo(todoId, editInputValue);
  }
  toggleForms();
});

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value;
  searchTodos(searchValue);
});

filterSelect.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterTodos(filterValue);
});

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

const searchTodos = (searchValue) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
    if (todoTitle.includes(searchValue.toLowerCase())) {
      todo.style.display = 'flex';
    } else {
      todo.style.display = 'none';
    }
  });
}

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    switch (filterValue) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'done':
        if (todo.classList.contains('done')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'todo':
        if (!todo.classList.contains('done')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

// Carregar tarefas ao carregar a página
document.addEventListener("DOMContentLoaded", fetchTodos);
