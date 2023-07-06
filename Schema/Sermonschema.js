const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sermonSchemaFunc = new Schema({
  title: {
    type: String,
    // required: true,
  },
  series: {
    type: String,
    // required: true,
  },
  speaker: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  video: {
    type: String,
    // required: true,
  },
  audio: {
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

module.exports = mongoose.model("sermonSchema", sermonSchemaFunc);
