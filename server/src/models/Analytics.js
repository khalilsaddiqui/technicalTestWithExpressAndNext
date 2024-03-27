const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    path: String,
    method: String,
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    userAgent: String,
    statusCode: Number,
    userId: mongoose.Schema.Types.ObjectId // Assuming user ID is stored as ObjectId
  });

module.exports =  mongoose.model('Analytics', analyticsSchema);