const {
  ProductionProcess,
  ProductionProcessItem,
  Supplies,
  sequelize,
} = require('../models');
const asyncCatch = require('./../utils/asyncCatch');
const { validationResult } = require('express-validator');
const factory = require('./factory');

exports.getAllProductionProcesses = factory.getAll(ProductionProcess);
exports.getProductionProcess = factory.getOne(ProductionProcess);
//kreira se u posebnoj metodi zbog dodatnog koda (automatsko racunanje cijene)
//exports.createProductionProcess = factory.createOne(ProductionProcess);
exports.updateProductionProcess = factory.updateOne(ProductionProcess);
//exports.deleteProductionProcess = factory.deleteOne(ProductionProcess); //nema brisanja

exports.createProductionProcess = asyncCatch(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new CustomError(errors.errors[0].msg, 400));
  }

  const newProductionProcess = {
    name: req.body.name,
    startDate: req.body.startDate,
  };

  let productionProcessPrice = 0;

  const items = req.body.items;

  for (const item of items) {
    const supply = await Supplies.findByPk(item.supplyId);
    productionProcessPrice += Number.parseFloat(supply.price * item.quantity);
  }

  newProductionProcess.price = productionProcessPrice;

  const t = await sequelize.transaction();

  try {
    const createdProductionProcess = await ProductionProcess.create(
      newProductionProcess,
      { transaction: t }
    );
    for (const item of items) {
      await ProductionProcessItem.create(
        {
          productionProcessId: createdProductionProcess.id,
          supplyId: item.supplyId,
          quantity: item.quantity,
        },
        { transaction: t }
      );
    }
    await t.commit();
    res.status(201).json({
      status: 'success',
      data: {
        data: createdProductionProcess,
      },
    });
  } catch (err) {
    await t.rollback();
  }
});
