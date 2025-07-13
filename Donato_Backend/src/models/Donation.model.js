const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: String,
  meal: Array,
  quantity: Number,
  preparedHoursAgo: Number,
  location: String,
  phone: String,
  date: String,
  time: String,
  guidelinesAccepted: Boolean,
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("Donation", donationSchema);
