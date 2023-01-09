const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Rute za login i logout dostupne svima
// Prema postavci nema rute za "Registraciju" (samo ADMIN dodaje zaposlenike)
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

// Promjena vlastite lozinke
router.patch('/updateMyPassword', authController.updatePassword);

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
