const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/people', async (req, res) => {
  try {
    const { login } = req.session;
    const users = await User.find({ login: { $ne: login } });
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

module.exports = usersRouter