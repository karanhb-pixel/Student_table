const express = require("express");
//const mysql = require("mysql2");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(
  cors({
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
); //Enable cors
app.use(express.json()); //parse json bodies

// Example API endpoint to fetch data
app.get("/api/data", async (req, res) => {
  const query = "SELECT * FROM student";
  try {
    const { rows } = await db.query(query); // Use `rows` to get the result
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const query = "SELECT * FROM student WHERE id = $1";

  try {
    const { rows } = await db.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update student by id
app.put("/api/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, place, phone } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const query =
    "UPDATE student SET name = $1, place = $2, phone = $3 WHERE id = $4 RETURNING *";

  try {
    const { rows } = await db.query(query, [name, place, phone, id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST endpoint to insert new student
app.post("/api/students", async (req, res) => {
  const { name, place, phone } = req.body;

  // In backend route
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }
  const query =
    "INSERT INTO student (name, place, phone) VALUES ($1, $2, $3) RETURNING *";
  try {
    const { rows } = await db.query(query, [name, place, phone]);
    res.json({
      id: rows[0].id,
      message: "Student added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE endpoint to delete student by id
app.delete("/api/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const query = "DELETE FROM student WHERE id = $1 RETURNING *";

  try {
    const { rows } = await db.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
