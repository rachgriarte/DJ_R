// NPM dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});

// Variable to access globally
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save(cb);
    });
  });
};