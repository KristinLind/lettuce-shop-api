const Store = require('../models/storeModel');

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving stores', error: err.message });
  }
};

const getSingleStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.status(200).json(store);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

module.exports = { getAllStores, getSingleStore };