const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: "https://celadon-fudge-37ebf0.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Use routes
app.use("/users", usersRoutes);

// default routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server running successfully",
  });
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
