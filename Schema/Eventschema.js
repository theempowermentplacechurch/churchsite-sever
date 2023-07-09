const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchemaFun = new Schema({
  bannerimage: {
    type: Array,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  series: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  details: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EventSchema", EventSchemaFun);
