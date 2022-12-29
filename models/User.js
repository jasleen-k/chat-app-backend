const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, min: 3, max: 20 },
  password: { type: String, required: true },
  isAvatarImageSet: { type: Boolean, default: false },
  avatarImage: { type: String, default: '' },
});

module.exports = mongoose.model('user', userSchema);
