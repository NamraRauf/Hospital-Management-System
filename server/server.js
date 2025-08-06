console.log("✅ Starting server.js...");
console.log("📂 ENV MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🏥 Hospital Management System API is Running");
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected Successfully");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("🔄 Connecting to MongoDB..."))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});
