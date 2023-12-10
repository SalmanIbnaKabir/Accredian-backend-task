// Import mysql2
const mysql = require("mysql2");

// Create database connection
const db = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12669253",
  password: "", // use your password
  database: "sql12669253",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Handle errors
db.on("error", (err) => {
  console.error("Database error:", err);
});

// Export database connection
module.exports = db;
