const { check } = require('express-validator');
const {
  PRODUCTION_PROCESS_NAME_REQUIRED,
  PRODUCTION_PROCESS_START_DATE_REQUIRED,
  PRODUCTION_PROCESS_START_DATE_VALID,
  PRODUCTION_PROCESS_ITEMS_REQUIRED,
} = require('../constants/productionProcessConstants');

exports.createProductionProcessValidator = [
  check('name').notEmpty().withMessage(PRODUCTION_PROCESS_NAME_REQUIRED).bail(),

  check('startDate')
    .notEmpty()
    .withMessage(PRODUCTION_PROCESS_START_DATE_REQUIRED)
    .isDate()
    .withMessage(PRODUCTION_PROCESS_START_DATE_VALID)
    .bail(),

  check('items')
    .notEmpty()
    .withMessage(PRODUCTION_PROCESS_ITEMS_REQUIRED)
    .bail(),

  (req, res, next) => {
    next();
  },
];
