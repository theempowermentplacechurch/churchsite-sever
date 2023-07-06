const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomepageSchemaFunc = new Schema({
  bannerimage: {
    type: String,
  },
  servicetime: {
    type: String,
  },
  liveservice: {
    type: String,
  },
  liveurl: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
  },
  whatsapp: {
    type: Number,
  },
  facebook: {
    type: String,
  },
  youtube: {
    type: String,
  },
  instagram: {
    type: String,
  },
});

module.exports = mongoose.model("HomepageSchema", HomepageSchemaFunc);
