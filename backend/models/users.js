const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
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
              throw new Error('Password must be at least 8 characters long!');
            }
          },
        },
      },
      role: {
        type: DataTypes.ENUM('employee', 'admin'),
        defaultValue: 'employee',
        validate: {
          isIn: {
            args: [['employee', 'admin']],
            msg: 'Role not supported',
          },
        },
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
