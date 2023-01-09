module.exports = (sequelize, DataTypes) => {
  const ProductionProcessItem = sequelize.define(
    'ProductionProcessItem',
    {
      productionProcessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: sequelize.model.ProductionProcess,
          key: 'id',
        },
      },
      supplyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: sequelize.model.Supplies,
          key: 'id',
        },
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
    },
    {
      tableName: 'production_process_item',
    }
  );

  return ProductionProcessItem;
};
