const { Pool } = require("pg");

// PostgreSQL connection
const db = new Pool({
  host: "dpg-cvg2r3l2ng1s73db21gg-a",
  user: "root",
  password: "X7ke6hZf91uQk0fMIbfd37KKcYlzvpb2",
  database: "user_a75x",
  port: 5432, // Ensure this is the correct port for your PostgreSQL server
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
