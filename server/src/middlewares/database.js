const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * @param {string} uri MongoDB connection URI
 * @returns {Promise} Resolves when connected, or rejects on error
 */
async function connectToDatabase(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the application on connection failure
  }
}

module.exports = connectToDatabase;
