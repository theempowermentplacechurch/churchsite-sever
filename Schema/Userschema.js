const mongoose = require("mongoose");

adminAccessSchemaFunc = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter you full name"],
    minlength: [5, "Enter full name"],
    trim: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
  useremail: {
    type: String,
    required: [true, "Enter your email address"],
    trim: true,
  },
  userphonenumber: {
    type: Number,
    required: [true, "Enter your active phone number"],
    trim: true,
  },
  position: {
    type: String,
    // default: "admin",
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },
  homepageaccess: {
    type: String,
    default: "No",
  },
  financepageaccess: {
    type: String,
    default: "No",
  },
  eventpageaccess: {
    type: String,
    default: "No",
  },
  sermonpageaccess: {
    type: String,
    default: "No",
  },
  ministerpageaccess: {
    type: String,
    default: "No",
  },
  addadminpageaccess: {
    type: String,
    default: "No",
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("adminAccessSchema", adminAccessSchemaFunc);
