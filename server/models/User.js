const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true },
  avatar: { type: String },
});

module.exports = model('User', schema);
