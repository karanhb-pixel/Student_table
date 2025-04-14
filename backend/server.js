const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Student = require("./models/student");

const app = express();

// Middleware for parsing and serialization
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Security headers
app.use((req, res, next) => {
  res.header("Content-Security-Policy", "default-src 'self'");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  next();
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Data serialization middleware
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    if (body !== null && body !== undefined) {
      if (body.password) delete body.password;
      if (body.secret) delete body.secret;
      body.timestamp = new Date().toISOString();
    }
    return originalJson.call(this, body);
  };
  next();
});

// Get all students
app.get("/api/data", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student by ID
app.get("/api/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
app.put("/api/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, place, phone } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.update({ name, place, phone });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create student
app.post("/api/students", async (req, res) => {
  const { name, place, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  try {
    const student = await Student.create({ name, place, phone });
    res.json({
      id: student.id,
      message: "Student added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.destroy();
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production" ? "An error occurred" : err.message,
  });
});

// Database connection and server start
const PORT = process.env.DB_PORT || 8080;

async function initializeDatabase() {
  try {
    // Check database connection
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database");

    // Check if the student table exists
    const tableExists = await sequelize
      .getQueryInterface()
      .showAllTables()
      .then((tables) => tables.includes("student"));

    if (!tableExists) {
      // If table doesn't exist, create it using the model
      await Student.sync();
      console.log("Student table created successfully");
    } else {
      console.log("Student table already exists");
      // Sync any model changes without dropping the table
      await Student.sync({ alter: true });
      console.log("Student table synchronized with model");
    }

    // Start the server after database initialization
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  }
}

// Initialize database and start server
initializeDatabase();
