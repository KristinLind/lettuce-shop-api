const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  category: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);