const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["Veg", "Non-veg"], required: true },
  meal: { type: [String], required: true },
  quantity: { type: Number, required: true },
  preparedHoursAgo: { type: Number },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guidelinesAccepted: { type: Boolean, required: true },
}, { timestamps: true });

const FoodDonation =
  mongoose.models.FoodDonation || mongoose.model("FoodDonation", foodDonationSchema);

module.exports = FoodDonation;
