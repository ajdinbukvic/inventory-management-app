const { ProductionProcess } = require('../models');
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
    return res.status(400).json(errors);
  }
  res.status(201).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});
