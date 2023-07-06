const mongoose = require("mongoose");

transactionSchemaFunc = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  purpose: {
    type: String,
  },
  amount: {
    type: Number,
  },
  paymentmethod: {
    type: String,
  },
  status: {
    type: String,
    default: "Unverified",
  },
  note: {
    type: String,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("transactionShema", transactionSchemaFunc);
