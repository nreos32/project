const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);

    // List all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((col) => col.name)
    );
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (error.name === "MongoServerError") {
      console.error("This might be an authentication or network issue");
    }
    process.exit(1);
  }
};

module.exports = connectDB;
