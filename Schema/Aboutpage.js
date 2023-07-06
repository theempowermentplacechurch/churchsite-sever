const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutpageSchemaFunc = new Schema({
  bannerimage: {
    type: String,
  },
  ministerimage: {
    type: String,
  },
  ministername: {
    type: String,
  },
  ministertitle: {
    type: String,
  },
});

module.exports = mongoose.model("AboutpageSchema", AboutpageSchemaFunc);
