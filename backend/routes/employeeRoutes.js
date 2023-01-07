const express = require('express');
const employeeController = require('./../controllers/employeeController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllEmployees)
  .post(userController.createEmployee);

router
  .route('/:id')
  .get(userController.getEmployee)
  .patch(userController.updateEmployee)
  .delete(userController.deleteEmployee);

module.exports = router;
