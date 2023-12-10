// Import bcrypt, jsonwebtoken, and database connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

// Define secret key for jwt
const SECRET_KEY = "secret";

// Define login function
exports.login = (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Query database for user with email
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    // Handle database error
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    // Check if user exists
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password with hashed password
    bcrypt.compare(password, result[0].password, (err, match) => {
      // Handle bcrypt error
      if (err) {
        return res.status(500).json({ message: "Bcrypt error" });
      }

      // Check if password matches
      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }
      // console.log(result);
      // Generate jwt token
      const token = jwt.sign(
        { id: result[0].id, email: result[0].email, name: result[0].name },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      // Send response with token
      res.status(200).json({ message: "Login successful", token });
    });
  });
};

// Define signup function
exports.signup = (req, res) => {
  // Get name, email, and password from request body
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  // Hash password with bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    // Handle bcrypt error
    if (err) {
      return res.status(500).json({ message: "Bcrypt error" });
    }

    // Insert user into database
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err, result) => {
        // Handle database error
        if (err) {
          // Check if duplicate email error
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: "Database error" });
        }

        // Send response with success message
        res.status(201).json({ message: "User created successfully" });
      }
    );
  });
};
