const productionProcessItem = require('./productionProcessItem');
const supplies = require('./supplies');
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
            if (value < 0) {
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

  ProductionProcess.addHook('afterCreate', async (process) => {
    //const id = this.getDataValue('id');
    const results = await sequelize.query(
      `SELECT p.id, SUM(pi.quantity * s.price) AS total FROM dbzalihe_177.production_process as p 
    INNER JOIN dbzalihe_177.production_process_item as pi ON p.id = pi.productionProcessId
    INNER JOIN dbzalihe_177.supplies AS s ON pi.supplyId = s.id
    WHERE p.id = ${process.id}
    GROUP BY p.id`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(results);
    const { total } = results;
    console.log(total);
    //console.log(results[0].total);
    process.price = total;
  });

  return ProductionProcess;
};
