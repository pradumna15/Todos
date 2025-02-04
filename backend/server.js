require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Todo Schema (Now linked to a user)
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Todo = mongoose.model("Todo", todoSchema);

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// User Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, userId: user._id });
});

// Get Todos (Only user-specific)
app.get("/todos", authenticate, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});

// Create a new todo
app.post("/todos", authenticate, async (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({ title, description, userId: req.user.userId });
  await newTodo.save();
  res.json(newTodo);
});

// Update a todo (title, description, or completion status)
app.put("/todos/:id", authenticate, async (req, res) => {
  const { title, description, completed } = req.body;
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { title, description, completed },
    { new: true }
  );
  if (!updatedTodo) return res.status(403).json({ message: "Not authorized" });
  res.json(updatedTodo);
});

// Toggle Todo Completion
app.patch("/todos/:id/toggle", authenticate, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!todo) return res.status(403).json({ message: "Not authorized" });

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", authenticate, async (req, res) => {
  const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!deletedTodo) return res.status(403).json({ message: "Not authorized" });
  res.json({ message: "Todo deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
