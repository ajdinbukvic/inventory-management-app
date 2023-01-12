module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      isUrl: true,
    },
    margin: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        checkPositiveValueBetween(value) {
          if (value <= 0 || value > 99) {
            throw new Error('Margin must be positive number between 1-100!');
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
  });

  Products.associate = (models) => {
    Products.belongsTo(models.ProductionProcess, {
      foreignKey: 'productionProcessId',
    });
  };

  return Products;
};
