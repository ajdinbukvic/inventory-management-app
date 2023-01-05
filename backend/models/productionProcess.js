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
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
      foreignKey: 'supplyId',
    });
  };

  return ProductionProcess;
};
