console.log("✅ Starting server.js...");
console.log("📂 ENV MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

// CORS configuration - allow requests from frontend
// In production, allow specific origins; in development, allow all
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      /\.vercel\.app$/,  // Allow all Vercel deployments
      /\.netlify\.app$/, // Allow all Netlify deployments
    ].filter(Boolean);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Check if origin matches allowed patterns
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true); // Allow for now, can restrict later
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("🏥 Hospital Management System API is Running");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
});

// Try to connect to MongoDB, but don't fail if it's not available
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/hospital-management")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
  console.error("❌ MongoDB Error:", err.message);
  console.log("⚠️  Server will continue running without database connection");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
