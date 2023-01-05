const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Suppliers = sequelize.define('Suppliers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vat: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      set(value) {
        moment.suppressDeprecationWarnings = true;
        this.setDataValue(
          'startDate',
          moment(new Date(value)).format('MM-DD-YYYY')
        );
      },
      get() {
        return moment(this.getDataValue('startDate')).format('DD-MM-YYYY');
      },
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      set(value) {
        moment.suppressDeprecationWarnings = true;
        this.setDataValue(
          'endDate',
          moment(new Date(value)).format('MM-DD-YYYY')
        );
      },
      get() {
        return moment(this.getDataValue('endDate')).format('DD-MM-YYYY');
      },
      allowNull: false,
    },
  });

  Suppliers.associate = (models) => {
    Suppliers.hasMany(models.Supplies, {
      foreignKey: 'supplierId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };

  return Suppliers;
};
