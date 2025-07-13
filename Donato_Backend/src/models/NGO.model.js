const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
  {
    NGOName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    totalFeeds: {
      type: Number,
      default: 0,
    },
    totalCampaigns: {
      type: Number,
      default: 0,
    },
    totalVolunteers: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit phone number`,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming your user model is named "User"
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NGO", ngoSchema);
