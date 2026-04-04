const Item = require('../models/itemModel');

//get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving items', error: err.message });
  }
};

//get single item
const getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

//create Item
const createItem =async (req, res) => {
  try {
    const {name, price, quantity } = req.body;
    if (!name) {
      return res.status(400).json({message: 'Name is required'});
    }

    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    res.status(201). json(savedItem);
  } catch (err) {
    res.status(500).json({message: 'Error creating item', error: err.message});
  }
};

//Update Item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if(!updatedItem) {
      return res.status(404).json({ message: 'Item not found'});
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err.message});
  }
};

const deleteItem = async(req, res, next) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            res.status(404);
            throw new Error('Item not found' );
        }

        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = { 
  getAllItems, 
  getSingleItem, 
  createItem, 
  updateItem, 
  deleteItem 
};