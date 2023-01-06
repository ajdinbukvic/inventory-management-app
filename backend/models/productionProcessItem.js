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
              throw new Error('Quantity must be positive number!');
            }
          },
        },
      },
    },
    {
      tableName: 'production_process_item',
    }
  );

  ProductionProcessItem.sumSupplyPriceAndQuantity = () => {
    ProductionProcessItem.findAll({
      attributes: ['productionProcessId'],
      include: [
        {
          model: Supplies,
          attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'total']],
          include: [
            {
              model: ProductionProcess,
              attributes: [],
            },
          ],
        },
      ],
      raw: true,
      group: ['productionProcessId'],
      nest: true,
    });
  };

  return ProductionProcessItem;
};
