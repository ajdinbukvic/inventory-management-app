const express = require('express');
const employeeController = require('./../controllers/employeeController');
const authController = require('./../controllers/authController');
const { createEmployeeValidator } = require('../validators/employeeValidators');
const { createUserValidator } = require('../validators/userValidators');
const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

// Zastita svih ruta ispod ovog middleware-a (samo logovani ADMIN)
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(
    createEmployeeValidator,
    createUserValidator,
    employeeController.createEmployee
  );

router
  .route('/:id')
  .get(userContemployeeControllerroller.getEmployee)
  .patch(employeeController.updateEmployee);
//.delete(userController.deleteEmployee);
//prema postavci zaposlenici se ne brisu vec se update-a "dismissalDate" na neki datum

module.exports = router;
