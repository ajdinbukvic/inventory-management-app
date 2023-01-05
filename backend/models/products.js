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
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Products.associate = (models) => {
    Products.belongsTo(models.ProductionProcess, {
      foreignKey: 'productionProcessId',
    });
  };

  return Products;
};
