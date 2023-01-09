module.exports = (sequelize, DataTypes) => {
  const Supplies = sequelize.define('Supplies', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        checkPositiveValue(value) {
          if (value < 0) {
            throw new Error('Quantity must be positive number or zero!');
          }
        },
      },
    },
    minQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        checkPositiveValue(value) {
          if (value < 0) {
            throw new Error('Min quantity must be positive number or zero!');
          }
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        checkPositiveValue(value) {
          if (value <= 0) {
            throw new Error('Price must be positive number!');
          }
        },
      },
    },
    unitMeasure: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Supplies.associate = (models) => {
    Supplies.belongsTo(models.Suppliers, {
      foreignKey: 'supplierId',
    });
    Supplies.belongsToMany(models.ProductionProcess, {
      through: 'ProductionProcessItem',
      foreignKey: 'supplyId',
    });
  };

  return Supplies;
};
