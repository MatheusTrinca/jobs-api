const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        cpfcnpj: DataTypes.STRING,
        role: {
          type: DataTypes.ENUM('admin', 'user', 'provider'),
          defaultValue: 'user',
        },
      },
      { sequelize }
    );
  }
}

module.exports = User;
