document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearAllButton = document.getElementById('clear-all');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const renderTasks = () => {
      taskList.innerHTML = tasks.map((task, i) => `
        <li class="${task.completed ? 'completed' : ''}">
          <span onclick="toggleTask(${i})">${task.text}</span>
          <button onclick="deleteTask(${i})">Delete</button>
        </li>
      `).join('');
    };
  
    const saveAndRender = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    taskForm.onsubmit = e => {
      e.preventDefault();
      if (taskInput.value.trim()) {
        tasks.push({ text: taskInput.value.trim(), completed: false });
        taskInput.value = '';
        saveAndRender();
      }
    };
  
    window.toggleTask = i => {
      tasks[i].completed = !tasks[i].completed;
      saveAndRender();
    };
  
    window.deleteTask = i => {
      tasks.splice(i, 1);
      saveAndRender();
    };
  
    clearAllButton.onclick = () => {
      tasks = [];
      saveAndRender();
    };
  
    renderTasks();
  });
  
