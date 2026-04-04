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

const createItem = async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      store: req.body.store,
      list: req.body.list,
      notes: req.body.notes
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: "Error creating item", error: err.message });
  }
};


const deleteItem = async(req, res, next) => {
    //#swagger.tags =['items']
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            res.status(404);
            throw new Error('Item not found' );
        }

        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = { getAllItems, getSingleItem, deleteItem, createItem };