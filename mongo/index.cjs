const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
require("dotenv").config();
const fs = require('fs');
const path = require('path');

// Ensure the Files directory exists
const filesDir = path.join(__dirname, 'Files');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' data: http://localhost:8000 https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;"
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const client = new MongoClient(uri);
let collection;



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
    const orgName = req.query.orgName; // Get organization name from query
    if (!orgName) {
      return res.status(400).json({ status: "error", message: "Organization name required" });
    }

    const db = client.db("login-deatils");
    const users = await db.collection("users_org")
      .find({ "Organisation Name": orgName })
      .toArray();

    // Transform the data to match the expected format
    const sanitizedUsers = users.map(user => ({
      _id: user._id,
      name: user.Name,
      email: user["User Email"],
      role: "user",
      status: "Active",
      lastLogin: "N/A"
    }));

    res.json(sanitizedUsers);
  } catch (e) {
    res.status(500).json({ status: "error", message: "Failed to fetch users" });
  }
});

// Add new user
app.post("/api/users", verifyToken, async (req, res) => {
  const { name, email, password } = req.body;
  const orgName = req.query.orgName; 
  const planName = req.query.planName; 

  try {
    // Check if required fields are present
    if (!name || !email || !password || !orgName || !planName) {
      return res.status(400).json({ 
        status: "error", 
        message: "Missing required fields" 
      });
    }

    // Check if user exists in users_org collection
    const db = client.db("login-deatils");
    const existingUser = await db.collection("users_org").findOne({ 
      "User Email": email,
      "Organisation Name": orgName 
    });

    if (existingUser) {
      return res.status(409).json({ 
        status: "error", 
        message: "User already exists in this organization" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into users_org collection
    const result = await db.collection("users_org").insertOne({
      "User Email": email,
      "Password": hashedPassword,
      "Name": name,
      "Plan": planName,
      "Organisation Name": orgName
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        _id: result.insertedId,
        name,
        email,
        plan: planName,
        organization: orgName
      }
    });

  } catch (e) {
    console.error("Error creating user:", e);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to create user" 
    });
  }
});


// Update user
app.put("/api/users/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const orgName = req.query.orgName; // Get organization name from query

  try {
    // Validate required fields
    if (!name && !email) {
      return res.status(400).json({ 
        status: "error", 
        message: "At least one field (name or email) is required for update" 
      });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData["Name"] = name;
    if (email) updateData["User Email"] = email;

    const db = client.db("login-deatils");
    const result = await db.collection("users_org").updateOne(
      { 
        _id: new ObjectId(id),
        "Organisation Name": orgName 
      },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        status: "error", 
        message: "User not found in this organization" 
      });
    }

    res.json({ 
      status: "success", 
      message: "User updated successfully" 
    });

  } catch (e) {
    console.error("Error updating user:", e);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to update user" 
    });
  }
});


// Delete user
app.delete("/api/users/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const orgName = req.query.orgName;

  try {
    const db = client.db("login-deatils");
    const result = await db.collection("users_org").deleteOne({ 
      _id: new ObjectId(id),
      "Organisation Name": orgName 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        status: "error", 
        message: "User not found in this organization" 
      });
    }

    res.json({ 
      status: "success", 
      message: "User deleted successfully" 
    });
    
  } catch (e) {
    console.error("Error deleting user:", e);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to delete user" 
    });
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

app.post("/signup1", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Received signup request:", { name, email });

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    // Check if user already exists in users collection
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "User already exists" });
    }

    // Check if organization already exists
    const db = client.db("login-deatils");
    const orgCollection = db.collection("Organisation_Name");
    const existingOrg = await orgCollection.findOne({ "User Email": email });
    if (existingOrg) {
      return res.status(409).json({ status: "error", message: "Organization already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Calculate current date and renewal date
    const currentDate = new Date();
    const renewalDate = new Date(currentDate);
    renewalDate.setDate(renewalDate.getDate() + 14);

    // Create transaction record data
    const transactionData = {
      "Organisation Name": name,
      "Plan Name": "Basic",
      "Amount": 0,
      "Date": currentDate,
      "Renewal Date": renewalDate,
      "Payment Status": true
    };

    // Insert new user into the users collection
    const userResult = await collection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    // Insert new organization into Organisation_Name collection
    const orgResult = await orgCollection.insertOne({
      "Organisation Name": name,
      "User Email": email,
      "Password": hashedPassword,
      "createdAt": currentDate
    });

    // Insert into Transactions collection
    const transactionsCollection = db.collection("Transactions");
    const transactionResult = await transactionsCollection.insertOne(transactionData);

    // Insert into History collection
    const historyCollection = db.collection("History");
    const historyResult = await historyCollection.insertOne(transactionData);

    console.log("New user created with ID:", userResult.insertedId);
    console.log("New organization created with ID:", orgResult.insertedId);
    console.log("Transaction record created with ID:", transactionResult.insertedId);
    console.log("History record created with ID:", historyResult.insertedId);

    // Generate JWT token
    const token = jwt.sign(
      { userId: userResult.insertedId, email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with success
    res.status(201).json({
      status: "success",
      message: "User and organization created successfully",
      name: name,
      token: token,
      role: "user"
    });
  } catch (e) {
    console.error("Server error during signup:", e);
    res.status(500).json({ status: "error", message: "Server error", details: e.message });
  }
});

app.post("/login1", async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const db = client.db("login-deatils");
    let collection;
    let user;

    switch(role) {
      case 'user':
        collection = db.collection("users_org");
        user = await collection.findOne({ "User Email": email });
        break;
      
      case 'admin':
        collection = db.collection("Organisation_Name");
        user = await collection.findOne({ "User Email": email });
        break;
      
      case 'super admin':
        collection = db.collection("users");
        user = await collection.findOne({ email: email });
        break;
    }

    if (user) {
      const storedHash = role === 'super admin' ? user.password : user.Password;
      const isPasswordValid = await bcrypt.compare(password, storedHash);

      if (isPasswordValid) {
        // Get the appropriate name based on role
        let userName;
        if (role === 'admin') {
          userName = user["Organisation Name"];
        } else if (role === 'user') {
          userName = user["Name"];  // Assuming this is the field name in users_org
        } else {
          userName = user["name"];     // For super admin
        }

        const token = jwt.sign(
          { 
            userId: user._id, 
            email: role === 'super admin' ? user.email : user["User Email"],
            role: role
          },
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.status(200).json({ 
          status: "success", 
          message: "Login successful", 
          name: userName,
          role: role,
          token: token
        });
        console.log(`${role} Logged In Successfully as ${userName}`);
      } else {
        res.status(401).json({ 
          status: "error", 
          message: "Invalid credentials" 
        });
      }
    } else {
      res.status(401).json({ 
        status: "error", 
        message: "Invalid credentials" 
      });
    }
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ 
      status: "error", 
      message: "Server error",
      details: e.message 
    });
  }
});

app.post('/api/plans', async (req, res) => {
  try {
    const planData = req.body;
    const filePath = '../Files/plans.json';
    
    // Create plans.json if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({ plans: [] }, null, 2));
    }

    // Read existing data
    let existingData = { plans: [] };
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch (err) {
      console.error('Error reading file:', err);
      // If there's an error reading, start with empty plans array
      existingData = { plans: [] };
    }

    // Validate incoming data
    if (!planData.name || !planData.price || !planData.subcontent || !planData.users || !planData.features) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Add new plan
    const newPlan = {
      name: planData.name.toUpperCase(),
      price: parseFloat(planData.price) || 0,
      subcontent: planData.subcontent,
      users: planData.users,
      features: planData.features.filter(feature => feature.trim() !== '')
    };

    existingData.plans.push(newPlan);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Plan added successfully',
      plan: newPlan 
    });
  } catch (error) {
    console.error('Server error saving plan:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to save plan' 
    });
  }
});

app.get('/api/plans', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'Files', 'plans.json');
    
    if (!fs.existsSync(filePath)) {
      return res.json({ plans: [] });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(fileContent));
  } catch (error) {
    console.error('Error reading plans:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to read plans' 
    });
  }
});

//////////////////////////////////// SUPER ADMIN ////////////////////////////////////////////////////////

//////////////////////////////////// ORGANISATION ADMIN ////////////////////////////////////////////////////////


// Organization details endpoint
app.get("/api/organization-details/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const db = client.db("login-deatils");

    // Get transaction details
    const transaction = await db.collection("Transactions")
      .findOne({ "Organisation Name": username });

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Organization not found"
      });
    }

    // Calculate max users based on plan
    let max_user;
    switch (transaction["Plan Name"]) {
      case "Basic":
        max_user = "1";
        break;
      case "Standard":
        max_user = "5";
        break;
      case "Plus":
        max_user = "10+";
        break;
      default:
        max_user = 0;
    }

    // Count current users
    const user_num = await db.collection("users_org")
      .countDocuments({ "Organisation Name": username });

    // Combine transaction data with user metrics
    const responseData = {
      ...transaction,  // Spread all transaction fields
      max_user,
      user_num
    };

    res.json({
      status: "success",
      data: responseData
    });

  } catch (error) {
    console.error("Error fetching organization details:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch organization details",
      error: error.message
    });
  }
});

// Add this endpoint to your server code
app.get("/api/payment-history/:orgName", async (req, res) => {
  const { orgName } = req.params;

  try {
    const db = client.db("login-deatils");
    const payments = await db.collection("History")
      .find({ 
        "Organisation Name": orgName 
      })
      .project({
        "Plan Name": 1,
        "Amount": 1,
        "Date": 1,
        "Payment Status": 1
      })
      .sort({ Date: -1 }) // Sort by date in descending order
      .toArray();

    const formattedPayments = payments.map(payment => ({
      planName: payment["Plan Name"],
      amount: payment.Amount,
      date: payment.Date,
      status: payment["Payment Status"] ? "Success" : "Failed"
    }));

    res.json({
      status: "success",
      data: formattedPayments
    });

  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch payment history",
      error: error.message
    });
  }
});
//////////////////////////////////// ORGANISATION ADMIN ////////////////////////////////////////////////////////

//////////////////////////////////// ORGANISATION USER ////////////////////////////////////////////////////////
// Dashboard data endpoint for user
app.get("/api/user-dashboard/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const db = client.db("login-deatils");

    // First find the organization name for the user
    const userOrg = await db.collection("users_org").findOne(
      { "Name": userName },
      { projection: { "Organisation Name": 1 } }
    );

    if (!userOrg) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    const orgName = userOrg["Organisation Name"];

    // Get transaction details for the organization
    const transaction = await db.collection("Transactions").findOne(
      { "Organisation Name": orgName }
    );

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction details not found"
      });
    }

    // Count users in the organization
    const userCount = await db.collection("users_org").countDocuments({
      "Organisation Name": orgName
    });

    // Combine all data
    const dashboardData = {
      organizationName: transaction["Organisation Name"],
      planName: transaction["Plan Name"],
      amount: transaction["Amount"],
      date: transaction["Date"],
      renewalDate: transaction["Renewal Date"],
      paymentStatus: transaction["Payment Status"],
      user_num: userCount
    };

    res.json({
      status: "success",
      data: dashboardData
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch dashboard data",
      error: error.message
    });
  }
});

app.get("/api/order-history/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const db = client.db("login-deatils");

    // First find the organization name for the user
    const userOrg = await db.collection("users_org").findOne(
      { "Name": userName },
      { projection: { "Organisation Name": 1 } }
    );

    if (!userOrg) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    // Get all history entries for this organization
    const history = await db.collection("History")
      .find({ "Organisation Name": userOrg["Organisation Name"] })
      .sort({ Date: -1 }) // Sort by date in descending order
      .toArray();

    res.json({
      status: "success",
      data: history
    });

  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch order history",
      error: error.message
    });
  }
});

app.get("/api/user-profile/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const db = client.db("login-deatils");

    const userProfile = await db.collection("users_org").findOne(
      { "Name": userName },
      { projection: { "Name": 1, "User Email": 1 } }
    );

    if (!userProfile) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    res.json({
      status: "success",
      data: {
        name: userProfile.Name,
        email: userProfile["User Email"]
      }
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user profile"
    });
  }
});


//////////////////////////////////// ORGANISATION USER ////////////////////////////////////////////////////////

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});