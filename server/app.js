require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const path = require('path');
const authRouter = require('./routes/auth.router');
const accountRouter = require('./routes/profile.router');
const usersRouter = require('./routes/users.router');

const { PORT, mongoUri } = process.env ?? 3100;

const app = express();

const sessionConfig = {
  name: 'Cookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));


//! app.use

app.use('/', authRouter);
app.use('/', accountRouter);
app.use('/', usersRouter);

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

async function start() {
  try {
    await mongoose.connect(`${mongoUri}`);
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
