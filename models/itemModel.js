const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  quantity: { type: Number },
  category: { type: String },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);