const express = require('express');
const supplyController = require('./../controllers/supplyController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
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
