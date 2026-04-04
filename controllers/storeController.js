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

// Create store (merged: explicit fields + name validation)
const createStore = async (req, res) => {
  try {
    const { name, address, category, notes } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Store name is required' });
    }
    const newStore = new Store({ name, address, category, notes });
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(400).json({ message: 'Error creating store', error: err.message });
  }
};

const updateStore = async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStore) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.status(200).json(updatedStore); // Fixed from updatedItem
  } catch (err) {
    res.status(400).json({ message: 'Error updating store', error: err.message });
  }
};

const deleteStore = async (req, res, next) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) {
      res.status(404);
      throw new Error('Store not found');
    }
    res.status(200).json({ message: 'Store deleted' });
  } catch (err) {
    res.status(500);
    next(err);
  }
};

// Fixed: includes all functions.
module.exports = { getAllStores, getSingleStore, createStore, updateStore, deleteStore };