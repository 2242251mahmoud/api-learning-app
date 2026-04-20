const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const formMessage = document.getElementById("formMessage");
const apiOut = document.getElementById("apiOut");
const filterBtns = document.querySelectorAll(".filterBtn");

let activeFilter = "all";
let currentTasks = [];

async function safeFetch(url, options = {}) {
  const response = await fetch(url, options);
  const hasJson = response.headers.get("content-type")?.includes("application/json");
  const data = hasJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data;
}

function renderTasks() {
  taskList.innerHTML = "";

  if (currentTasks.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  currentTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "taskItem";

    const title = document.createElement("span");
    title.textContent = task.title;
    title.className = task.done ? "done" : "open";

    const actionWrap = document.createElement("div");
    actionWrap.className = "actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "secondary";
    toggleBtn.textContent = task.done ? "Mark open" : "Mark done";
    toggleBtn.addEventListener("click", () => toggleTask(task.id, !task.done));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actionWrap.append(toggleBtn, deleteBtn);
    li.append(title, actionWrap);
    taskList.append(li);
  });
}

async function loadTasks() {
  const query = activeFilter === "all" ? "" : `?status=${activeFilter}`;
  const tasks = await safeFetch(`/api/tasks${query}`);
  currentTasks = tasks;
  apiOut.textContent = JSON.stringify(tasks, null, 2);
  renderTasks();
}

async function addTask() {
  const title = taskInput.value.trim();

  if (!title) {
    formMessage.textContent = "Please enter a task title.";
    return;
  }

  formMessage.textContent = "Saving...";

  await safeFetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  formMessage.textContent = "Task added.";
  await loadTasks();
}

async function toggleTask(id, done) {
  await safeFetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ done })
  });

  await loadTasks();
}

async function deleteTask(id) {
  await safeFetch(`/api/tasks/${id}`, {
    method: "DELETE"
  });

  await loadTasks();
}

addTaskBtn.addEventListener("click", async () => {
  try {
    await addTask();
  } catch (error) {
    formMessage.textContent = `Error: ${error.message}`;
  }
});

taskInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") {
    return;
  }

  try {
    await addTask();
  } catch (error) {
    formMessage.textContent = `Error: ${error.message}`;
  }
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    filterBtns.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;

    try {
      await loadTasks();
    } catch (error) {
      apiOut.textContent = `Error: ${error.message}`;
    }
  });
});

loadTasks().catch((error) => {
  apiOut.textContent = `Error: ${error.message}`;
});
