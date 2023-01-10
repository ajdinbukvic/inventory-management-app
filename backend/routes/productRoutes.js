const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const productValidator = require('../validators/productValidators');
const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productValidator.createProductValidator,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
