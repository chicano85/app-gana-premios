const express = require('express');

const router = express.Router();
const { authorize } = require('../../../utils/middleware/jwt');
const authController = require('./auth.controller');
const userController = require('../user/user.controller');
const userValidator = require('../user/user.validator');

// Activar usuario
router.post('/activate/:token', userValidator.activateUser, authController.activateAccount);

// Login del usuario
router.post('/login', userValidator.loginUser, authController.login);

// Registrar usuario
router.post('/register', userValidator.createUser, authController.register);

router.put('/profile', authorize, userValidator.putUser, authController.updateProfile);

// Enviar mail para recuperar contraseña
router.post('/forgot', userValidator.emailRecoveryUser, userController.forgotPassword);

// Restablecer contraseña
router.post('/recovery/:token', userValidator.recoveryUser, userController.recovery);

// Desbloquear cuenta
router.post('/unlock/:token', userValidator.unlockUser, authController.unBlockAccount);

// Subir LOPD
router.post('/lopd', authorize, userValidator.createLopdUser, userController.createLopd);

// Descargar LOPD
router.get('/lopd', authorize, userController.getLopd);

module.exports = router;
