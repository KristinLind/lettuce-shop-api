const Item = require('../models/itemModel');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving items', error: err.message });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

module.exports = { getAllItems, getSingleItem };