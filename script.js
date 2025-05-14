const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const macro = document.getElementById("macroTask").value;
  const sub = document.getElementById("subtask").value;
  const component = document.getElementById("lifeComponent").value;
  const deadline = document.getElementById("deadline").value;

  const newTask = {
    macroTask: macro,
    subtasks: [{ title: sub, done: false }],
    lifeComponent: component,
    deadline,
    status: "در جریان"
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  form.reset();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `
      <strong>${task.macroTask}</strong> - ${task.lifeComponent} <br/>
      ${task.subtasks.map(st => `<span class="${st.done ? 'done' : ''}">${st.title}</span>`).join("<br/>")}
      <br/>
      <small>موعد: ${task.deadline || "ندارد"}</small>
    `;
    taskList.appendChild(div);
  });
}

renderTasks();
