const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const tips = [
  "Every API request has a URL, method, and optional data.",
  "GET requests fetch data. POST requests send new data.",
  "JSON is the most common API data format.",
  "Frontend code usually calls APIs with fetch()."
];

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from your backend API!",
    time: new Date().toISOString(),
    requestMethod: req.method
  });
});

app.get("/api/tip", (req, res) => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  res.json({
    tip: randomTip,
    totalTips: tips.length
  });
});

app.post("/api/echo", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Please send text as a string." });
  }

  return res.json({
    original: text,
    uppercased: text.toUpperCase(),
    length: text.length
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
