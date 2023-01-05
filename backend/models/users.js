const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          minLengthValidator(value) {
            if (value.length < 8) {
              throw new Error('Password must be at least 8 character long!');
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING(50),
        defaultValue: 'employee',
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    }
  );

  Users.associate = (models) => {
    Users.belongsTo(models.Employees, {
      foreignKey: 'employeeId',
    });
  };

  Users.addHook('beforeCreate', async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });

  return Users;
};
