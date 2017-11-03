const mongoose = require('mongoose')
const userShema = mongoose.Schema({
  name: String,
  password: String
})

const User = mongoose.model('User', userShema);

module.exports = User;
