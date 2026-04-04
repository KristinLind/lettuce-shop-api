const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

const createNewUser = async (req, res) => {

  try {
    const newUser = new User({
      githubId: req.body.githubId,
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  //#swagger.tags =['users']
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = { getAllUsers, getSingleUser, deleteUser, createNewUser };