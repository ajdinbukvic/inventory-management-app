const express = require('express');
const employeeController = require('../controllers/employeeController');
const authController = require('../controllers/authController');
const employeeValidator = require('../validators/employeeValidators');
const userValidator = require('../validators/userValidators');
const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

// Zastita svih ruta ispod ovog middleware-a (samo logovani ADMIN)
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(
    employeeValidator.createEmployeeValidator,
    userValidator.createUserValidator,
    employeeController.createEmployee
  );
//prilikom kreiranja zaposlenika, istovremeno se kreira i korisnik (TRANSAKCIJA)

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee);
//.delete(userController.deleteEmployee);
//prema postavci zaposlenici se ne brisu vec se update-a "dismissalDate" na neki datum

module.exports = router;
