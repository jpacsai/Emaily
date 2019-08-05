const mongoose = require('mongoose');
const keys = require('../config/keys');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log('✔ MongoDB connected');
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;