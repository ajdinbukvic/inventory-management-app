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
            throw new Error('Quantity must be positive number!');
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
            throw new Error('Min quantity must be positive number!');
          }
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        checkPositiveValue(value) {
          if (value < 0) {
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
      allowNull: false,
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
