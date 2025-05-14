// script.js
// تنظیم ورودی تاریخ میلادی/شمسی با تغییر رادیو
const radioMiladi = document.getElementById('cal-miladi');
const radioShamsi = document.getElementById('cal-shamsi');
const dateMiladi = document.getElementById('dateMiladi');
const dateShamsi = document.getElementById('dateShamsi');

function toggleDateInput() {
    if (radioMiladi.checked) {
        dateMiladi.style.display = 'inline';
        dateShamsi.style.display = 'none';
        dateMiladi.required = true;
        dateShamsi.required = false;
    } else {
        dateMiladi.style.display = 'none';
        dateShamsi.style.display = 'inline';
        dateMiladi.required = false;
        dateShamsi.required = true;
    }
}
radioMiladi.addEventListener('change', toggleDateInput);
radioShamsi.addEventListener('change', toggleDateInput);

// کلید ذخیره در localStorage
const TASKS_KEY = 'lifeosTasks';

// بارگذاری آرایهٔ تسک‌ها از localStorage
function loadTasks() {
    const tasksJson = localStorage.getItem(TASKS_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
}
// ذخیره آرایهٔ تسک‌ها در localStorage
function saveTasks(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

// تابع نمایش تسک‌ها
function renderTasks() {
    const tasks = loadTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    // آیکون‌ها و نام فارسی مولفه‌ها
    const compIcons = {
        mind: '🧠',
        body: '💪',
        resources: '💰',
        relationships: '🤝',
        faith: '🕌'
    };
    const compNames = {
        mind: 'ذهن',
        body: 'جسم',
        resources: 'منابع',
        relationships: 'روابط',
        faith: 'ایمان'
    };
    // ایجاد المان برای هر تسک
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task ' + task.component;
        // آیکون مولفه
        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon';
        iconSpan.textContent = compIcons[task.component] || '';
        div.appendChild(iconSpan);
        // جزئیات تسک
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details';
        let html = '';
        html += `<p><strong>تسک:</strong> ${task.title}`;
        html += ` <strong>ریزتسک:</strong> ${task.subtask || '—'}</p>`;
        html += `<p><strong>تاریخ:</strong> ${task.date} `;
        html += `<strong>ساعت:</strong> ${task.time}</p>`;
        html += `<p><strong>مولفه:</strong> ${compNames[task.component] || ''}</p>`;
        detailsDiv.innerHTML = html;
        div.appendChild(detailsDiv);
        taskList.appendChild(div);
    });
}

// رویداد ثبت فرم تسک جدید
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const subtask = document.getElementById('subtask').value.trim();
    const component = document.getElementById('component').value;
    let dateVal = '';
    // تعیین مقدار تاریخ بر اساس نوع تقویم
    if (radioMiladi.checked) {
        dateVal = dateMiladi.value;
    } else {
        dateVal = dateShamsi.value.trim();
    }
    const timeVal = document.getElementById('time').value;
    if (!title || !component || !dateVal || !timeVal) {
        alert('لطفاً تمام فیلدهای مورد نیاز را پر کنید.');
        return;
    }
    // ساخت شیء تسک و ذخیره
    const newTask = { title, subtask, date: dateVal, time: timeVal, component };
    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    // بازنشانی فرم و نمایش دوباره تسک‌ها
    document.getElementById('taskForm').reset();
    toggleDateInput();
    renderTasks();
});

// مقداردهی اولیه فرم و نمایش تسک‌های موجود
toggleDateInput();
renderTasks();