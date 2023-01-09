const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

// Zastita svih ruta ispod ovog middleware-a (samo logovani ADMIN)
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);
//.delete(userController.deleteUser);
//prema postavci nema brisanja korisnika

module.exports = router;
