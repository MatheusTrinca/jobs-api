const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
        isLogged: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        hooks: {
          beforeCreate: user => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          },

          beforeUpdate: user => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'address' });
  }
}

module.exports = User;
