const accountRouter = require('express').Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, './public/Images');
  },
  filename(req, file, cb) {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });
const User = require('../models/User');


accountRouter.put('/update', upload.single('avatar'), async (req, res) => {
  try {
    const { login } = req.session;
    const avatar = req.file ? req.file.filename : null;
    const user = await User.findOne({ login });
    const {login: newLogin, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    if (user) {
      user.login = newLogin;
      user.password = hash;
      user.avatar = avatar
      await user.save();
      req.session.login = newLogin;
      res.json({user});
    } else {
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

module.exports = accountRouter;

