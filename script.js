let tasks = [];

function addTask() {
  const macro = document.getElementById('macroTask').value;
  const micro = document.getElementById('microTask').value;
  const dateTime = document.getElementById('taskDateTime').value;
  const component = document.getElementById('taskComponent').value;

  if (!macro || !micro || !dateTime || !component) return alert("تمام فیلدها الزامی هستند.");

  const task = { macro, micro, dateTime, component };
  tasks.push(task);
  scheduleNotification(task);
  renderTasks();
}

function renderTasks(filtered = null) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  const list = filtered || tasks;

  list.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <strong>${task.macro}</strong> - ${task.micro}<br/>
      زمان: ${task.dateTime}<br/>
      مولفه: ${task.component}
      <div class="actions">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(div);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('macroTask').value = task.macro;
  document.getElementById('microTask').value = task.micro;
  document.getElementById('taskDateTime').value = task.dateTime;
  document.getElementById('taskComponent').value = task.component;
  deleteTask(index);
}

function sortTasks(criteria) {
  if (criteria === 'date') {
    tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  }
  renderTasks();
}

function filterTasks(component) {
  if (!component) return renderTasks();
  const filtered = tasks.filter(task => task.component === component);
  renderTasks(filtered);
}

function scheduleNotification(task) {
  const delay = new Date(task.dateTime) - new Date();
  if (delay > 0) {
    setTimeout(() => {
      alert(`یادآوری: ${task.macro} - ${task.micro}`);
    }, delay);
  }
}
