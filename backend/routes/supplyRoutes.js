const express = require('express');
const supplyController = require('./../controllers/supplyController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

router
  .route('/')
  .get(supplyController.getAllSupplies)
  .post(supplyController.createSupply);

router
  .route('/:id')
  .get(supplyController.getSupply)
  .patch(supplyController.updateSupply)
  .delete(supplyController.deleteSupply);

module.exports = router;
