const { Pool } = require("pg");

// PostgreSQL connection
const db = new Pool({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
  port: 5000, // Ensure this is the correct port for your PostgreSQL server
});

// Test the connection
db.connect()
  .then((client) => {
    console.log("Connected to PostgreSQL database!");
    client.release(); // Release the client back to the pool
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err.stack);
  });

module.exports = db;
