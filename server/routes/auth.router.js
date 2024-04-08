const authRouter = require('express').Router();
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

authRouter.get('/', async (req, res) => {
  if (req.session.login) {
    const user = await User.findOne({ where: { login: req.session.login } });
    res.status(200).json(user);
  } else {
    res.json({ login: req.session?.login || '' });
  }
});

authRouter.post('/reg', upload.single('avatar'), async (req, res) => {
  try {
    const {
      login, email, password, birthDate, gender,
    } = req.body;

    const avatar = req.file ? req.file.filename : null;
    const existingLogin = await User.findOne({ login });
    const existingEmail = await User.findOne({ email });

    if (existingLogin) {
      return res.status(202).json({ message: 'Пользователь с таким именем уже существует'});
    }
    if (existingEmail) {
      return res.status(202).json({ message: 'Пользователь с таким имейлом уже существует' });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      login,
      email,
      password: hash,
      birthDate,
      gender,
      avatar,
    });
    req.session.login = user.login;
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'не удалось зарегистрироваться' });
  }
});

authRouter.post('/log', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        res.status(200).json({ user });
      } else {
        res.status(202).json({ message: 'Неверный пароль' });
      }
    } else {
      res.status(202).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Не удалось найти пользователя' });
  }
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('Cookie');
    res.status(200).send({ message: 'Logged out' });
  });
});

module.exports = authRouter;
