const express = require('express');
const authController = require('../controllers/authController');
const {
  loginUserValidator,
  changePasswordUserValidator,
} = require('../validators/userValidators');

const router = express.Router();

// Rute za login i logout dostupne svima
// Prema postavci nema rute za "Registraciju" (samo ADMIN dodaje zaposlenike)
router.post('/login', loginUserValidator, authController.login);
router.get('/logout', authController.logout);

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

// Promjena vlastite lozinke (posebna auth ruta - izvan ostalih user ruta za "update")
router.patch(
  '/changePassword',
  changePasswordUserValidator,
  authController.changePassword
);

module.exports = router;
