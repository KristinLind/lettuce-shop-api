const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String },
  username: { type: String, required: true },
  displayName: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);