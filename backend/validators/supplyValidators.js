const { check } = require('express-validator');
const {
  SUPPLY_NAME_REQUIRED,
  SUPPLY_QUANTITY_REQUIRED,
  SUPPLY_MIN_QUANTITY_REQUIRED,
  SUPPLY_PRICE_REQUIRED,
  SUPPLY_UNIT_MEASURE_REQUIRED,
  SUPPLY_SUPPLIER_REQUIRED,
  SUPPLY_QUANTITY_POSITIVE,
  SUPPLY_MIN_QUANTITY_POSITIVE,
  SUPPLY_PRICE_POSITIVE,
  SUPPLY_QUANTITY_VALID,
  SUPPLY_MIN_QUANTITY_VALID,
  SUPPLY_PRICE_VALID,
  SUPPLY_SUPPLIER_NOT_EXISTS,
  SUPPLY_SUPPLIER_VALID,
} = require('../constants/supplyConstants');
const { Suppliers } = require('../models');

exports.createSupplyValidator = [
  check('name').notEmpty().withMessage(SUPPLY_NAME_REQUIRED).bail(),

  check('quantity')
    .notEmpty()
    .withMessage(SUPPLY_QUANTITY_REQUIRED)
    .isFloat()
    .withMessage(SUPPLY_QUANTITY_VALID)
    .custom((value) => {
      if (Number.parseFloat(value) <= 0) {
        return Promise.reject(SUPPLY_QUANTITY_POSITIVE);
      }
    })
    .bail(),

  check('minQuantity')
    .notEmpty()
    .withMessage(SUPPLY_MIN_QUANTITY_REQUIRED)
    .isFloat()
    .withMessage(SUPPLY_MIN_QUANTITY_VALID)
    .custom((value) => {
      if (Number.parseFloat(value) <= 0) {
        return Promise.reject(SUPPLY_MIN_QUANTITY_POSITIVE);
      }
    })
    .bail(),

  check('price')
    .notEmpty()
    .withMessage(SUPPLY_PRICE_REQUIRED)
    .isFloat()
    .withMessage(SUPPLY_PRICE_VALID)
    .custom((value) => {
      if (Number.parseFloat(value) <= 0) {
        return Promise.reject(SUPPLY_PRICE_POSITIVE);
      }
    })
    .bail(),

  check('unitMeasure')
    .notEmpty()
    .withMessage(SUPPLY_UNIT_MEASURE_REQUIRED)
    .bail(),

  check('supplierId')
    .notEmpty()
    .withMessage(SUPPLY_SUPPLIER_REQUIRED)
    .isInt()
    .withMessage(SUPPLY_SUPPLIER_VALID)
    .custom(async (value) => {
      const supplier = await Suppliers.findByPk(value);
      if (supplier == null) {
        return Promise.reject(SUPPLY_SUPPLIER_NOT_EXISTS(value));
      }
    })
    .bail(),

  (req, res, next) => {
    next();
  },
];
