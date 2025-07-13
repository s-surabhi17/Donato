const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.wsevp7a.mongodb.net/Seva?retryWrites=true&w=majority&appName=Cluster1`
    );
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.log("❌ MongoDB connection error:", err.message);
  }
};
