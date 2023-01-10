const { Products } = require('../models');
const asyncCatch = require('./../utils/asyncCatch');
const { validationResult } = require('express-validator');
const factory = require('./factory');

exports.getAllProducts = factory.getAll(Products);
exports.getProduct = factory.getOne(Products);
//kreira se u posebnoj metodi zbog dodatnog koda (automatsko racunanje cijene)
//exports.createProduct = factory.createOne(Products);
exports.updateProduct = factory.updateOne(Products);
exports.deleteProduct = factory.deleteOne(Products);

exports.createProduct = asyncCatch(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  await t.commit();
  res.status(201).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});
