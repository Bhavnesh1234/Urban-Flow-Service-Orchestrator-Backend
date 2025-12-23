const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async () => {
  try {
console.log("Process.env.MONGO_URI", process.env.MONGO_URI);
 await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Connection Failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
