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

const createNewStore = async (req, res) => {
  try {
    const newStore = new Store({
      name: req.body.name,
      address: req.body.address,
      category: req.body.category,
      notes: req.body.notes
    });

    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(400).json({ message: "Error creating store", error: err.message });
  }
};

const deleteStore = async(req, res, next) => {
    //#swagger.tags =['stores']
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.id);

        if (!deletedStore) {
            res.status(404);
            throw new Error('Store not found' );
        }

        res.status(200).json({ message: 'Store deleted' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = { getAllStores, getSingleStore, deleteStore, createNewStore };