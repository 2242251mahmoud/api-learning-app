const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let nextId = 4;
const tasks = [
  { id: 1, title: "Review API basics", done: false, createdAt: new Date().toISOString() },
  { id: 2, title: "Build one useful endpoint", done: true, createdAt: new Date().toISOString() },
  { id: 3, title: "Connect frontend with fetch", done: false, createdAt: new Date().toISOString() }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", (req, res) => {
  const { status } = req.query;

  if (status === "open") {
    return res.json(tasks.filter((task) => !task.done));
  }

  if (status === "done") {
    return res.json(tasks.filter((task) => task.done));
  }

  return res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Please send a non-empty task title." });
  }

  const newTask = {
    id: nextId,
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString()
  };

  nextId += 1;
  tasks.unshift(newTask);

  return res.status(201).json(newTask);
});

app.patch("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { done } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id." });
  }

  if (typeof done !== "boolean") {
    return res.status(400).json({ error: "Please send done as true or false." });
  }

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  task.done = done;

  return res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id." });
  }

  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks.splice(index, 1);

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
