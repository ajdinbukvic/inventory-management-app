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
        unique: true,
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
    //prilikom GET korisnika, ne ispisuje se vrijednost atributa "password"
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

  //prije kreiranja novog korisnika u bazu, hesiranje lozinke
  Users.addHook('beforeCreate', async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });

  // //prije spremanja korisnika koji je promijenio lozinku, hesiranje lozinke
  // Users.addHook('beforeSave', async (user) => {
  //   if (!user.changed('password')) return;
  //   user.password = await bcrypt.hash(user.password, 12);
  // });

  //provjera ispravnosti lozinke prije logina i promjene lozinke
  Users.prototype.comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
  };

  return Users;
};
