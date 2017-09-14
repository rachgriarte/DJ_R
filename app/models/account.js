// Define results table in DB
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('Account', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    account_balance: {
        type: DataTypes.INTEGER,
        defaultValue: 5000
    },
    bet_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    win_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      through: models.User,
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Account;
}