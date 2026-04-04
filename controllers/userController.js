const User = require('../models/userModel');

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};

//get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

//create user- testing before Oauth implementation
const createUser =async (req, res) => {
  try {
    const {username, email } = req.body;
    if (!username) {
      return res.status(400).json({message: 'username is required'});
    }

    const newUser = new User({
      username,
      email,
      displayName: req.body.displayName
  });
    const savedUser = await newUser.save();

    res.status(201). json(savedUser);
  } catch (err) {
    res.status(500).json({message: 'Error creating user', error: err.message});
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if(!updatedUser) {
      return res.status(404).json({ message: 'User not found'});
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message});
  }
};

//delete user
const deleteUser = async(req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            res.status(404);
            throw new Error('User not found' );
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = { 
  getAllUsers, 
  getSingleUser, 
  createUser,
  updateUser,
  deleteUser 
};