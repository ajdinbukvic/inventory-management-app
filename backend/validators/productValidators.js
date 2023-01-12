const { check } = require('express-validator');
const {
  PRODUCT_NAME_REQUIRED,
  PRODUCT_IMAGE_URL_REQUIRED,
  PRODUCT_MARGIN_REQUIRED,
  PRODUCT_PRODUCTION_PROCESS_REQUIRED,
  PRODUCT_MARGIN_VALID,
  PRODUCT_MARGIN_POSITIVE_BETWEEN,
  PRODUCT_IMAGE_URL_VALID,
  PRODUCT_PRODUCTION_PROCESS_NOT_EXISTS,
  PRODUCT_PRODUCTION_PROCESS_VALID,
} = require('../constants/productConstants');
const { ProductionProcess } = require('../models');

exports.createProductValidator = [
  check('name').notEmpty().withMessage(PRODUCT_NAME_REQUIRED).bail(),

  check('imageUrl')
    .notEmpty()
    .withMessage(PRODUCT_IMAGE_URL_REQUIRED)
    .isURL()
    .withMessage(PRODUCT_IMAGE_URL_VALID)
    .bail(),

  check('margin')
    .notEmpty()
    .withMessage(PRODUCT_MARGIN_REQUIRED)
    .toFloat()
    .isFloat()
    .withMessage(PRODUCT_MARGIN_VALID)
    .isFloat({ gt: 0.0, lt: 100 })
    .withMessage(PRODUCT_MARGIN_POSITIVE_BETWEEN)
    .bail(),

  check('productionProcessId')
    .notEmpty()
    .withMessage(PRODUCT_PRODUCTION_PROCESS_REQUIRED)
    .isInt()
    .withMessage(PRODUCT_PRODUCTION_PROCESS_VALID)
    .custom(async (value) => {
      const prProcess = await ProductionProcess.findByPk(value);
      if (prProcess == null) {
        return Promise.reject(PRODUCT_PRODUCTION_PROCESS_NOT_EXISTS(value));
      }
    })
    .bail(),

  (req, res, next) => {
    next();
  },
];
