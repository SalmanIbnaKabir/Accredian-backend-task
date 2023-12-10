// Import express and router
const express = require("express");
const router = express.Router();

// Import controller
const usersController = require("../controllers/usersController");

// Define login endpoint
router.post("/login", usersController.login);

// Define sign-up endpoint
router.post("/signup", usersController.signup);

// Export router
module.exports = router;
