const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validade: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid email address" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
});

module.exports = mongoose.model("User", userSchema);
