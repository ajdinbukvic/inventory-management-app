module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      defaultValue: 'employee',
    },
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Employees, {
      foreignKey: 'employeeId',
    });
  };

  return Users;
};
