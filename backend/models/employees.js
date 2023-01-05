const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define('Employees', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    employmentDate: {
      type: DataTypes.DATEONLY,
      set(value) {
        moment.suppressDeprecationWarnings = true;
        this.setDataValue(
          'employmentDate',
          moment(new Date(value)).format('MM-DD-YYYY')
        );
      },
      get() {
        return moment(this.getDataValue('employmentDate')).format('DD-MM-YYYY');
      },
      allowNull: false,
    },
    dismissalDate: {
      type: DataTypes.DATEONLY,
      set(value) {
        moment.suppressDeprecationWarnings = true;
        this.setDataValue(
          'dismissalDate',
          moment(new Date(value)).format('MM-DD-YYYY')
        );
      },
      get() {
        if (!this.getDataValue('dismissalDate')) return null;
        return moment(this.getDataValue('dismissalDate')).format('DD-MM-YYYY');
      },
      defaultValue: null,
    },
  });

  Employees.associate = (models) => {
    Employees.hasOne(models.Users, {
      foreignKey: 'employeeId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };

  return Employees;
};
