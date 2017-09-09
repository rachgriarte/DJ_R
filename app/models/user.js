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

// Exports the function to get the username in the db
module.exports.getUserByUsername = (username, cb) => {
  const query = {
    username: username
  };

  // Find user in db
  User.findOne(query, cb);
}

// Exports the function to get the username in the db
module.exports.getUserById = (id, cb) => {
  // Find user in db
  User.findById(id, cb);
} 

// Exports the function to compare password
module.exports.comparePassword = (enteredPass, hash, cb) => {
  bcrypt.compare(enteredPass, hash, (error, match) => {
    if (error) throw error;

    cb(null, match);
  });
}