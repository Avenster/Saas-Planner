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

// Add headers for Content Security Policy and font loading
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' data: http://localhost:8000 https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;"
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

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

//////////////////////////////////// SUPER ADMIN ////////////////////////////////////////////////////////
// Add this endpoint to your existing server code

// Dashboard analytics endpoint
// Add this endpoint to your existing server code

// Dashboard analytics endpoint
// Add this endpoint to your existing server code

// Dashboard analytics endpoint
app.get("/api/dashboard-analytics", async (req, res) => {
  try {
    const db = client.db("login-deatils");
    console.log("Connected to database: login-deatils");
    
    // 1. Total Revenue
    const totalRevenue = await db.collection("Transactions")
      .aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$Amount" }
          }
        }
      ]).toArray();
    console.log("Total Revenue:", totalRevenue);

    // 2. Active Organizations Count
    const activeOrganizations = await db.collection("Organisation_Name")
      .countDocuments();
    console.log("Active Organizations:", activeOrganizations);

    // 3. Total Users Count
    const totalUsers = await db.collection("users_org")
      .countDocuments();
    console.log("Total Users:", totalUsers);

    // 4. Failed Payments Count
    const failedPayments = await db.collection("Transactions")
      .countDocuments({ "Payment Status": false });
    console.log("Failed Payments:", failedPayments);

    // 5. Plan Distribution
    const planDistribution = await db.collection("Transactions")
      .aggregate([
        {
          $group: {
            _id: "$Plan Name",
            count: { $sum: 1 }
          }
        }
      ]).toArray();
    console.log("Plan Distribution:", planDistribution);

    // 6. Recent Payments
    const recentPayments = await db.collection("Transactions")
      .find()
      .sort({ Date: -1 })
      .limit(3)
      .toArray();
    console.log("Recent Payments:", recentPayments);

    // 7. Recent Organisations
    const recentOrganizations = await db.collection("Organisation_Name")
      .find()
      .sort({ _id: -1 })
      .limit(3)
      .toArray();
    console.log("Recent Organizations:", recentOrganizations);

    // Compile all data
    const dashboardData = {
      totalRevenue: totalRevenue[0]?.total || 0,
      activeOrganizations,
      totalUsers,
      failedPayments,
      planDistribution: planDistribution.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      recentPayments: recentPayments.map(payment => ({
        amount: payment.Amount,
        planName: payment["Plan Name"],
        date: payment.Date,
        organization: payment.Organization || payment.OrganizationName
      })),
      recentOrganizations: recentOrganizations.map(org => ({
        organizationName: org["Organisation Name"], // Changed this line to match exact field name
        date: org.createdAt || org.Date,
        id: org._id
      }))
    };

    console.log("Final Dashboard Data:", JSON.stringify(dashboardData, null, 2));

    res.json({
      status: "success",
      data: dashboardData
    });

  } catch (error) {
    console.error("Dashboard analytics error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch dashboard analytics",
      error: error.message
    });
  }
});

// Organization and Transactions Summary endpoint
// Organization, Transactions and Users Summary endpoint
app.get("/api/organization-summary", async (req, res) => {
  try {
    const db = client.db("login-deatils");
    console.log("Fetching comprehensive summary...");

    // 1. Get organizations summary
    const organizations = await db.collection("Organisation_Name")
      .find({})
      .toArray();

    const summaryPromises = organizations.map(async (org) => {
      const orgName = org["Organisation Name"];
      console.log("Processing organization:", orgName);

      const transaction = await db.collection("Transactions")
        .findOne(
          { "Organisation Name": orgName },
          { sort: { Date: -1 } }
        );

      const userCount = await db.collection("users_org")
        .countDocuments({ "Organisation Name": orgName });

      const planName = transaction?.["Plan Name"] || "N/A";
      const status = planName === "Basic" ? "Trial" : "Active";

      return {
        Organization: orgName,
        Plan: planName,
        Users: userCount,
        Status: status,
        "Renewal Date": transaction?.["Renewal Date"] || "N/A"
      };
    });

    // 2. Get all transactions data
    const transactions = await db.collection("Transactions")
      .find({})
      .project({ _id: 0 })
      .toArray();

    // 3. Get users data (only name and email)
    const users = await db.collection("users")
      .find({})
      .project({ 
        _id: 0,
        name: 1,
        email: 1
      })
      .toArray();

    const organizationSummary = await Promise.all(summaryPromises);

    console.log("Organization Summary:", JSON.stringify(organizationSummary, null, 2));
    console.log("Sample Transaction:", JSON.stringify(transactions[0], null, 2));
    console.log("Sample User:", JSON.stringify(users[0], null, 2));

    res.json({
      status: "success",
      data: {
        organizationSummary: organizationSummary,
        allTransactions: transactions,
        users: users
      }
    });

  } catch (error) {
    console.error("Comprehensive summary error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch comprehensive summary",
      error: error.message
    });
  }
});

// Add this to your server code
app.post("/api/users/add", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required"
      });
    }

    const db = client.db("login-deatils");
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User with this email already exists"
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date()
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        name,
        email,
        role
      }
    });

  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add user",
      error: error.message
    });
  }
});
//////////////////////////////////// SUPER ADMIN ////////////////////////////////////////////////////////

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});