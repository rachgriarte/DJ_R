// Define user table in DB
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    win: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loss: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ties: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalBlackJacks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  User.associate = function(models) {
    User.hasOne(models.Account, {
      onDelete: 'CASCADE'
    });
  }
  
 return User;
}