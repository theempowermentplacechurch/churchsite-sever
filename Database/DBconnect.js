const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDatabase = () => {
  return mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection established"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
