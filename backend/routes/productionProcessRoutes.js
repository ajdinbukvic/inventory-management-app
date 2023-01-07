const express = require('express');
const productionProcessController = require('./../controllers/productionProcessController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(productionProcessController.getAllProductionProcesses)
  .post(productionProcessController.createSupply);

router
  .route('/:id')
  .get(productionProcessController.getProductionProcess)
  .patch(productionProcessController.updateProductionProcess)
  .delete(productionProcessController.deleteProductionProcess);

module.exports = router;
