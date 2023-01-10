const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Zastita svih ruta ispod ovog middleware-a (samo logovani korisnici)
router.use(authController.protect);

// Zastita svih ruta ispod ovog middleware-a (samo logovani ADMIN)
router.use(authController.restrictTo('admin'));

// router
//   .route('/')
//   .get(userController.getAllUsers) //korisnici se GET-aju direktno u getAll employee
//   .post(userController.createUser); //korisnici se kreiraju istovremeno kod kreiranja employee

// router
//   .route('/:id')
//   .get(userController.getUser) //jedan korisnik se GET-a direktno u getOne employee
//   .patch(userController.updateUser); //kod korisnika se nema sta update-ovati (osim lozinke u authControlleru)
//.delete(userController.deleteUser); //prema postavci nema brisanja korisnika

module.exports = router;
