//new
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Admin } = require('mongodb');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: false // optional for Google/Facebook auth users
  },
  name: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ngos"
    }
  ],
  role: {
    type: String,
    enum: ['donor', 'ngo', 'volunteer','admin'],
    required: true,
    default: 'donor'
  }

}, {
  versionKey: false,
  timestamps: true
});

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// 🔑 Method to compare password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema); // collection: users
