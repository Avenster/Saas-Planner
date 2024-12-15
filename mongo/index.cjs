const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = "mongodb+srv://avenster:IGF9EONYxYXR5FIl@login-details.plgmf.mongodb.net/?retryWrites=true&w=majority&appName=login-details";
const client = new MongoClient(uri);
let collection;

const JWT_SECRET = 'aadeb42f91a814953fecccfae030312591ee01e7fc4873e01738b2c761bff2855f006016aac196d999f703b1523546a50e2756385ce9be30f5e0cc449ab25653';

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db("login-deatils");
    collection = database.collection("users");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  }
}

connectToMongo();

// Get all users
app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const users = await collection.find({}).toArray();
    // Remove sensitive information
    const sanitizedUsers = users.map(({ password, ...user }) => ({
      ...user,
      lastLogin: user.lastLogin || 'Never',
      status: user.status || 'Active'
    }));
    res.json(sanitizedUsers);
  } catch (e) {
    res.status(500).json({ status: "error", message: "Failed to fetch users" });
  }
});

// Add new user
app.post("/api/users", verifyToken, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await collection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      status: 'Active',
      lastLogin: null,
      createdAt: new Date()
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        _id: result.insertedId,
        name,
        email,
        role,
        status: 'Active'
      }
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: "Failed to create user" });
  }
});

// Update user
app.put("/api/users/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;

  try {
    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(status && { status })
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ status: "success", message: "User updated successfully" });
  } catch (e) {
    res.status(500).json({ status: "error", message: "Failed to update user" });
  }
});

// Delete user
app.delete("/api/users/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ status: "success", message: "User deleted successfully" });
  } catch (e) {
    res.status(500).json({ status: "error", message: "Failed to delete user" });
  }
});


// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ 
        status: "success", 
        message: "Login successful", 
        name: user.name,
        role: user.role,
        token: token
      });
      console.log("User Logged In Successfully");
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});


// Signup route
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      console.log("Received signup request:", { name, email });
  
      // Check if all fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      // Check if user already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ status: "error", message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new user into the database
      const result = await collection.insertOne({
        name,
        email,
        password: hashedPassword,
        role: "user"
      });
  
      console.log("New user created with ID:", result.insertedId);
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: result.insertedId, email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Respond with success
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        name: name, // Use 'name' from request body
        token: token,
        role: "user"
      });
    } catch (e) {
      console.error("Server error during signup:", e);
      res.status(500).json({ status: "error", message: "Server error", details: e.message });
    }
  });
  
// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Failed to authenticate token" });
    req.user = decoded;
    next();
  });
}

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});