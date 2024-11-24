const mongoose = require("mongoose");

const db = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Connected to MongoDB");
  } catch (err) {
    res.status(400).json({ message: "Not connected" });
    console.log("Error connecting MongoDB", err);
  }
};

module.exports = db;
