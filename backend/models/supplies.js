module.exports = (sequelize, DataTypes) => {
  const Supplies = sequelize.define('Supplies', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitMeasure: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Supplies.associate = (models) => {
    Supplies.belongsTo(models.Suppliers, {
      foreignKey: 'supplierId',
    });
    Supplies.belongsToMany(models.ProductionProcess, {
      through: 'ProductionProcessItem',
      foreignKey: 'productionProcessId',
    });
  };

  return Supplies;
};
