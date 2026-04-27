const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors"); 
const User = require("./models/User");
const Task = require("./models/Task");
const auth = require("./middleware/auth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors()); 

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));


// ================= AUTH =================

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashed });

    res.send("User registered");
  } catch {
    res.status(500).send("Error registering user");
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return res.status(400).send("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch {
    res.status(500).send("Error logging in");
  }
});


// ================= TASKS =================

// CREATE TASK
app.post("/tasks", auth, async (req, res) => {
  try {
    const task = await Task.create({
      userId: req.user.id,
      title: req.body.title,
      completed: false
    });

    res.json(task);
  } catch {
    res.status(500).send("Error creating task");
  }
});

// GET TASKS
app.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch {
    res.status(500).send("Error fetching tasks");
  }
});

// DELETE TASK
app.delete("/tasks/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.send("Task deleted");
  } catch {
    res.status(500).send("Error deleting task");
  }
});


// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});