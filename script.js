const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

function toJalali(gDateStr) {
  const [gy, gm, gd] = gDateStr.split("-").map(Number);
  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);
  return `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const macro = document.getElementById("macroTask").value;
  const micro = document.getElementById("microTask").value;
  const date = document.getElementById("taskDate").value;
  const hour = document.getElementById("hour").value.padStart(2, "0");
  const minute = document.getElementById("minute").value.padStart(2, "0");
  const second = document.getElementById("second").value.padStart(2, "0");

  const jalali = toJalali(date);
  const time = `${hour}:${minute}:${second}`;
  const fullDate = `${date} (میلادی) / ${jalali} (شمسی) – ${time}`;

  const taskData = {
    macro,
    micro,
    fullDate
  };

  let tasks = JSON.parse(localStorage.getItem("lifeosTasks")) || [];
  tasks.push(taskData);
  localStorage.setItem("lifeosTasks", JSON.stringify(tasks));
  renderTasks();
  form.reset();
});

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("lifeosTasks")) || [];
  taskList.innerHTML = "<h3>تسک‌های ثبت‌شده:</h3>";
  tasks.forEach((t, i) => {
    taskList.innerHTML += `<p><strong>${t.macro}</strong> – ${t.micro} <br> (${t.fullDate})</p><hr>`;
  });
}

window.onload = renderTasks;
