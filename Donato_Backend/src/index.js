//neww55
require('dotenv').config();
const { connectRedis } = require("./configs/redis");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = require('./configs/db');
connectDB();

const NGO = require("./models/NGO.model");

const express = require("express");
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require("cors");

const User = require("./models/user.model");
const userController = require("./controllers/user.controller");
const ngoController = require("./controllers/ngo.controller");
const foodDonationController = require("./controllers/foodDonation.controller");
const Donation = require("./models/Donation.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Options
const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// ✅ Apply CORS Middleware early
app.use(cors(corsOptions));

// ✅ Global OPTIONS handler (important for preflight requests)
app.options("*", cors(corsOptions));

if (process.env.IS_HEROKU) {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: "none",
        secure: true,
        domain: process.env.BACKEND_URL,
        path: "/",
        httpOnly: true,
      },
    })
  );
} else {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key-here',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );
}

const passportConfig = require("./configs/passport");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const newUser = await User.findById(id).lean().exec();
    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Donato Food Sharing Backend is running!",
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

// UPDATED: Login route with role-based redirects
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Please provide email and password" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "Invalid email address" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    req.login(user, (err) => {
      if (err) return res.status(500).json({ success: false, message: "Failed to create session" });

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      };

      // Role-based redirect URLs
      let redirectTo = "/home"; // default
      switch(user.role) {
        case 'admin':
          redirectTo = "/admin-dashboard";
          break;
        case 'ngo':
          redirectTo = "/ngo-dashboard";
          break;
        case 'volunteer':
          redirectTo = "/volunteer-dashboard";
          break;
        case 'donor':
        default:
          redirectTo = "/donor-dashboard";
          break;
      }

      console.log(`✅ User logged in: ${user.email} with role: ${user.role}, redirecting to: ${redirectTo}`);
      res.json({ 
        success: true, 
        message: "Login successful", 
        user: userResponse, 
        redirectTo: redirectTo 
      });
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// UPDATED: Signup route with role-based redirects
app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const allowedRoles = ['donor', 'ngo', 'volunteer','admin'];
    if (!allowedRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "Invalid email" });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ success: false, message: "Weak password format" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) return res.status(409).json({ success: false, message: "User already exists" });

    const newUser = new User({ name, email: email.toLowerCase().trim(), password, role: role.toLowerCase() });
    const savedUser = await newUser.save();

    req.login(savedUser, (err) => {
      const userResponse = {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        createdAt: savedUser.createdAt
      };

      // Role-based redirect URLs
      let redirectTo = "/home"; // default
      switch(savedUser.role) {
        case 'admin':
          redirectTo = "/admin-dashboard";
          break;
        case 'ngo':
          redirectTo = "/ngo-dashboard";
          break;
        case 'volunteer':
          redirectTo = "/volunteer-dashboard";
          break;
        case 'donor':
        default:
          redirectTo = "/donor-dashboard";
          break;
      }

      console.log(`✅ User created: ${savedUser.email} with role: ${savedUser.role}, redirecting to: ${redirectTo}`);

      if (err) {
        return res.status(201).json({ 
          success: true, 
          message: "User created. Please login.", 
          user: userResponse,
          redirectTo: redirectTo
        });
      }

      res.status(201).json({ 
        success: true, 
        message: "User created and logged in", 
        user: userResponse, 
        redirectTo: redirectTo 
      });
    });

  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: "Validation error", errors: Object.values(error.errors).map(e => e.message) });
    }

    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    const userResponse = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt
    };
    res.json({ success: true, authenticated: true, user: userResponse });
  } else {
    res.json({ success: true, authenticated: false, user: null });
  }
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failure" }),
  function (req, res) {
    const redirectUrl = `${process.env.ORIGIN || "http://localhost:3000"}/oauth-success`;
    res.redirect(redirectUrl);
  }
);

app.get("/auth/google/failure", (req, res) => {
  res.redirect(`${process.env.ORIGIN || "http://localhost:3000"}/login?error=oauth`);
});

// ✅ Custom middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.status(401).json({ success: false, message: "Authentication required" });
};

const isNGO = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user?.role === 'ngo') return next();
  res.status(403).json({ success: false, message: "NGO access required" });
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user?.role === 'admin') return next();
  res.status(403).json({ success: false, message: "Admin access required" });
};

const isDonor = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user?.role === 'donor') return next();
  res.status(403).json({ success: false, message: "Donor access required" });
};

const isVolunteer = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user?.role === 'volunteer') return next();
  res.status(403).json({ success: false, message: "Volunteer access required" });
};

// NEW: Debug route to check user session and role
app.get("/debug/user", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: req.user,
    sessionID: req.sessionID,
    isAuthenticated: req.isAuthenticated(),
    message: "Debug info"
  });
});

app.get("/test", isAuthenticated, (req, res) => {
  res.json({ success: true, message: "Auth test passed", user: req.user });
});

// NEW: Public NGOs route (no authentication required) - for homepage
app.get("/api/ngos", async (req, res) => {
  try {
    console.log("📋 Fetching NGOs for public access");
    const ngos = await NGO.find().lean();
    res.json({ success: true, ngos });
  } catch (err) {
    console.error("❌ Failed to fetch NGOs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch NGOs" });
  }
});

// Routes with role-based access
app.use("/user", isAuthenticated, userController);
app.use("/ngos", isAuthenticated, isNGO, ngoController);
app.use("/food-donation", isAuthenticated, foodDonationController);

// ✅ Allow OPTIONS request specifically for logout
app.options("/auth/logout", cors(corsOptions));

// ✅ Logout Route
app.post("/auth/logout", (req, res) => {
  console.log("🔁 Logout route called");
  console.log("🔐 User before logout:", req.user);
  console.log("🪪 Session ID:", req.sessionID);

  // Passport logout
  req.logout((err) => {
    if (err) {
      console.error("❌ Error during logout:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    // Destroy session
    req.session?.destroy((err) => {
      if (err) {
        console.error("❌ Error destroying session:", err);
        return res.status(500).json({ success: false, message: "Session destruction failed" });
      }

      // Clear cookie from client
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",  // Adjust if needed (can be 'strict' too)
        secure: false     // Use true in production with HTTPS
      });

      console.log("✅ Logout complete: session destroyed, cookie cleared");
      return res.json({ success: true, message: "Logout successful" });
    });
  });
});

// ✅ All NGOs — public (keeping your original route)
app.get("/all", async (req, res) => {
  try {
    const ngos = await NGO.find().lean();
    res.status(200).json(ngos);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch NGOs" });
  }
});

// Home page data - accessible to all authenticated users
app.get("/home-data", isAuthenticated, async (req, res) => {
  try {
    console.log(`📊 Fetching home data for user: ${req.user.email} (${req.user.role})`);
    const ngos = await NGO.find().lean();
    res.json({ success: true, ngos, userRole: req.user.role });
  } catch (err) {
    console.error("❌ Failed to fetch home data:", err);
    res.status(500).json({ success: false, message: "Failed to fetch NGOs" });
  }
});

// Donation history - accessible to all authenticated users
app.get("/donation-history", isAuthenticated, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch donation history" });
  }
});

// ✅ NGO By User ID (for NGOProfile)
app.get("/ngos/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: "Invalid user ID format" });
  }

  try {
    const ngo = await NGO.findOne({ createdBy: userId }).lean();
    if (!ngo) {
      return res.status(404).json({ success: false, message: "NGO not found for this user" });
    }

    res.status(200).json({ success: true, ngo });
  } catch (err) {
    console.error("❌ Error fetching NGO by userId:", err);
    res.status(500).json({ success: false, message: "Failed to fetch NGO by user ID" });
  }
});

// UPDATED: Admin routes with better logging
app.get("/admin/users", isAuthenticated, isAdmin, async (req, res) => {
  try {
    console.log("🔍 Admin requesting users list. User:", req.user.email, "Role:", req.user.role);
    const allUsers = await User.find({}, "-password").sort({ createdAt: -1 }).lean();
    res.json({ success: true, users: allUsers });
  } catch (err) {
    console.error("❌ Failed to fetch users", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// NEW: Additional admin routes
app.get("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
  try {
    console.log("🔍 Admin requesting users list via API. User:", req.user.email, "Role:", req.user.role);
    const allUsers = await User.find({}, "-password").sort({ createdAt: -1 }).lean();
    res.json({ success: true, users: allUsers });
  } catch (err) {
    console.error("❌ Failed to fetch users via API", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

app.get("/api/admin/ngos", isAuthenticated, isAdmin, async (req, res) => {
  try {
    console.log("🔍 Admin requesting NGOs list. User:", req.user.email, "Role:", req.user.role);
    const allNGOs = await NGO.find().populate('createdBy', 'name email').sort({ createdAt: -1 }).lean();
    res.json({ success: true, ngos: allNGOs });
  } catch (err) {
    console.error("❌ Failed to fetch NGOs for admin", err);
    res.status(500).json({ success: false, message: "Failed to fetch NGOs" });
  }
});

app.get("/api/admin/donations", isAuthenticated, isAdmin, async (req, res) => {
  try {
    console.log("🔍 Admin requesting donations list. User:", req.user.email, "Role:", req.user.role);
    const allDonations = await Donation.find().populate('userId', 'name email').sort({ createdAt: -1 }).lean();
    res.json({ success: true, donations: allDonations });
  } catch (err) {
    console.error("❌ Failed to fetch donations for admin", err);
    res.status(500).json({ success: false, message: "Failed to fetch donations" });
  }
});

// ✅ 404 Fallback with logging
app.use("*", (req, res) => {
  console.log("🚨 Unmatched route:", req.method, req.originalUrl);
  console.log("🚨 User:", req.user ? `${req.user.email} (${req.user.role})` : 'Not authenticated');
  res.status(404).json({ success: false, message: "Route not found" });
});

const bcrypt = require("bcryptjs");

async function createAdminUser() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("ℹ️ Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin123@", 10);
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date()
    });

    await admin.save();
    console.log("✅ Admin user created");
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
}

// ✅ Server listener
const PORT = process.env.PORT || 9900;
app.listen(PORT, async () => {
  try {
    connectRedis();
    console.log("✅ Redis connected");
    console.log(`✅ Server running on port ${PORT}`);
    await createAdminUser();
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
    process.exit(1);
  }
});

module.exports = app;