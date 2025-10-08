console.log("✅ Starting server.js...");
console.log("📂 ENV MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");  // <-- ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);  // <-- ADD THIS

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
