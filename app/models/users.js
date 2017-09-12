// Define user table in DB
module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING,
      validate: {
          isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    win: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    loss: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    ties: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    totalBlackJacks: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });
  return User;
}