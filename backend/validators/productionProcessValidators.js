const { check } = require('express-validator');
const {
  PRODUCTION_PROCESS_NAME_REQUIRED,
  PRODUCTION_PROCESS_START_DATE_REQUIRED,
  PRODUCTION_PROCESS_START_DATE_VALID,
} = require('../constants/productionProcessConstants');

exports.createProductionProcessValidator = [
  check('name').notEmpty().withMessage(PRODUCTION_PROCESS_NAME_REQUIRED).bail(),

  check('startDate')
    .notEmpty()
    .withMessage(PRODUCTION_PROCESS_START_DATE_REQUIRED)
    .isDate()
    .withMessage(PRODUCTION_PROCESS_START_DATE_VALID)
    .bail(),

  (req, res, next) => {
    next();
  },
];
