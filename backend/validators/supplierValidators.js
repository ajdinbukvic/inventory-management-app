const { check } = require('express-validator');
const {
  SUPPLIER_NAME_REQUIRED,
  SUPPLIER_UID_REQUIRED,
  SUPPLIER_VAT_REQUIRED,
  SUPPLIER_PHONE_NUMBER_REQUIRED,
  SUPPLIER_CONTACT_PERSON_REQUIRED,
  SUPPLIER_START_DATE_REQUIRED,
  SUPPLIER_EMAIL_REQUIRED,
  SUPPLIER_EMAIL_ALREADY_EXISTS,
  SUPPLIER_UID_ALREADY_EXISTS,
  SUPPLIER_VAT_ALREADY_EXISTS,
  SUPPLIER_START_DATE_VALID,
  SUPPLIER_EMAIL_VALID,
} = require('../constants/supplierConstants');
const { Suppliers } = require('../models');

exports.createSupplierValidator = [
  check('name').notEmpty().withMessage(SUPPLIER_NAME_REQUIRED).bail(),

  check('uid')
    .notEmpty()
    .withMessage(SUPPLIER_UID_REQUIRED)
    .custom(async (value) => {
      const supplier = await Suppliers.findOne({ where: { uid: value } });
      if (supplier != null) {
        return Promise.reject(SUPPLIER_UID_ALREADY_EXISTS(value));
      }
    })
    .bail(),

  check('vat')
    .notEmpty()
    .withMessage(SUPPLIER_VAT_REQUIRED)
    .custom(async (value) => {
      const supplier = await Suppliers.findOne({ where: { vat: value } });
      if (supplier != null) {
        return Promise.reject(SUPPLIER_VAT_ALREADY_EXISTS(value));
      }
    })
    .bail(),

  check('phoneNumber')
    .notEmpty()
    .withMessage(SUPPLIER_PHONE_NUMBER_REQUIRED)
    .bail(),

  check('contactPerson')
    .notEmpty()
    .withMessage(SUPPLIER_CONTACT_PERSON_REQUIRED)
    .bail(),

  check('email')
    .notEmpty()
    .withMessage(SUPPLIER_EMAIL_REQUIRED)
    .isEmail()
    .withMessage(SUPPLIER_EMAIL_VALID)
    .custom(async (value) => {
      const supplier = await Suppliers.findOne({ where: { email: value } });
      if (supplier != null) {
        return Promise.reject(SUPPLIER_EMAIL_ALREADY_EXISTS(value));
      }
    })
    .bail(),

  check('startDate')
    .notEmpty()
    .withMessage(SUPPLIER_START_DATE_REQUIRED)
    .isDate()
    .withMessage(SUPPLIER_START_DATE_VALID)
    .bail(),

  (req, res, next) => {
    next();
  },
];
