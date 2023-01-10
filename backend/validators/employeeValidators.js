const { check } = require('express-validator');
const {
  EMPLOYEE_FIRTSTNAME_REQUIRED,
  EMPLOYEE_LASTNAME_REQUIRED,
  EMPLOYEE_PHONE_NUMBER_REQUIRED,
  EMPLOYEE_ADDRESS_REQUIRED,
  EMPLOYEE_EMPLOYMENT_DATE_REQUIRED,
  EMPLOYEE_EMAIL_REQUIRED,
  EMPLOYEE_EMAIL_ALREADY_EXISTS,
  EMPLOYEE_EMPLOYMENT_DATE_VALID,
  EMPLOYEE_EMAIL_VALID,
} = require('../constants/employeeConstants');
const { Employees } = require('../models');

exports.createEmployeeValidator = [
  check('firstName')
    .notEmpty()
    .withMessage(EMPLOYEE_FIRTSTNAME_REQUIRED)
    .bail(),

  check('lastName').notEmpty().withMessage(EMPLOYEE_LASTNAME_REQUIRED).bail(),

  check('phoneNumber')
    .notEmpty()
    .withMessage(EMPLOYEE_PHONE_NUMBER_REQUIRED)
    .bail(),

  check('address').notEmpty().withMessage(EMPLOYEE_ADDRESS_REQUIRED).bail(),

  check('employmentDate')
    .notEmpty()
    .withMessage(EMPLOYEE_EMPLOYMENT_DATE_REQUIRED)
    .isDate()
    .withMessage(EMPLOYEE_EMPLOYMENT_DATE_VALID)
    .bail(),

  check('email')
    .notEmpty()
    .withMessage(EMPLOYEE_EMAIL_REQUIRED)
    .isEmail()
    .withMessage(EMPLOYEE_EMAIL_VALID)
    .custom(async (value) => {
      const employee = await Employees.findOne({ where: { email: value } });
      if (employee != null) {
        return Promise.reject(EMPLOYEE_EMAIL_ALREADY_EXISTS(value));
      }
    })
    .bail(),

  (req, res, next) => {
    next();
  },
];
