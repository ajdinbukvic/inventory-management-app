const express = require('express');
const productionProcessController = require('./../controllers/productionProcessController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

router
  .route('/')
  .get(productionProcessController.getAllProductionProcesses)
  .post(productionProcessController.createProductionProcess);

router
  .route('/:id')
  .get(productionProcessController.getProductionProcess)
  .patch(productionProcessController.updateProductionProcess);
//.delete(productionProcessController.deleteProductionProcess);
//prema postavci proizvodni procesi se ne brisu vec se update-a "endDate" na neki datum

module.exports = router;
