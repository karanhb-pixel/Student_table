const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors()); //Enable cors
app.use(express.json()); //parse json bodies

//Mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
});

//Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Example API endpoint to fetch data
app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM student";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const query = "SELECT * FROM student WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(results[0]);
  });
});

app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, place, phone } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const query =
    "INSERT INTO student (name, place, phone) VALUES (?, ?, ?) WHERE id = ?";

  db.query(query, [name, place, phone, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(results[0]);
  });
});

// POST endpoint to insert new student
app.post("/api/students", (req, res) => {
  const { name, place, phone } = req.body;

  // In backend route
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }
  const query = "INSERT INTO student (name, place, phone) VALUES (?, ?, ?)";
  db.query(query, [name, place, phone], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: result.insertId,
      message: "Student added successfully",
    });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
