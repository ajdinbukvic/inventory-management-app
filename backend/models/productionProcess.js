const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const ProductionProcess = sequelize.define(
    'ProductionProcess',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        defaultValue: null,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: null,
        validate: {
          checkPositiveValue(value) {
            if (value <= 0) {
              throw new Error('Price must be positive number!');
            }
          },
        },
      },
    },
    {
      tableName: 'production_process',
    }
  );

  ProductionProcess.associate = (models) => {
    ProductionProcess.hasMany(models.Products, {
      foreignKey: 'productionProcessId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    ProductionProcess.belongsToMany(models.Supplies, {
      through: 'ProductionProcessItem',
      foreignKey: 'productionProcessId',
    });
  };

  return ProductionProcess;
};
