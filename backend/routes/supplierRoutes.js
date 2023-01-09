const express = require('express');
const supplierController = require('./../controllers/supplierController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

router
  .route('/')
  .get(supplierController.getAllSuppliers)
  .post(supplierController.createSupplier);

router
  .route('/:id')
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier);
//.delete(supplierController.deleteSupplier);
//prema postavci dobavljaci se ne brisu vec se update-a "endDate" na neki datum

module.exports = router;
