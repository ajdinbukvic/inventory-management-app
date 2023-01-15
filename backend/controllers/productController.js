const { Products, ProductionProcess } = require('../models');
const asyncCatch = require('./../utils/asyncCatch');
const { validationResult } = require('express-validator');
const factory = require('./factory');
const CustomError = require('./../utils/customError');

exports.getAllProducts = factory.getAll(Products);
exports.getProduct = factory.getOne(Products);
//kreira se u posebnoj metodi zbog dodatnog koda (automatsko racunanje cijene)
//exports.createProduct = factory.createOne(Products);
exports.updateProduct = factory.updateOne(Products);
exports.deleteProduct = factory.deleteOne(Products);

exports.createProduct = asyncCatch(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new CustomError(errors.errors[0].msg, 400));
  }

  const newProduct = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    margin: req.body.margin,
    productionProcessId: req.body.productionProcessId,
  };

  const productionProcess = await ProductionProcess.findByPk(
    req.body.productionProcessId
  );
  newProduct.price = Number.parseFloat(
    (req.body.margin / 100.0) * productionProcess.price
  );

  const createdProduct = await Products.create(newProduct);

  res.status(201).json({
    status: 'success',
    data: {
      data: createdProduct,
    },
  });
});
