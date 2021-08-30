const express = require('express');
const userController = require('./controllers/userController');
const addressController = require('./controllers/addressController');
const { body } = require('express-validator');
const restrictTo = require('./middlewares/restrictTo');
const authMiddleware = require('./middlewares/auth');

const router = express.Router();

// USER ROUTES
router.post(
  '/users/login',
  [body('email', 'Este não é um email válido').isEmail()],
  userController.login
);

router.post(
  '/users',
  [
    body('name')
      .isLength({ min: 5 })
      .withMessage('Nome deve ter ao menos 5 caracteres'),
    body('email', 'Este não é um email válido').isEmail(),
    body('password', 'Senha deve ter ao menos 5 caracteres').isLength({
      min: 5,
    }),
    body('cpfcnpj', 'Informe um CPF/CNPJ válido').notEmpty(),
  ],
  userController.store
);

//! ROTAS ABAIXO REQUEREM AUTENTICAÇÃO
router.use(authMiddleware);

router.get('/users', restrictTo('admin'), userController.index);

router.put(
  '/users/:id',
  [
    body('name')
      .isLength({ min: 5 })
      .withMessage('Nome deve ter ao menos 5 caracteres'),
    body('email', 'Este não é um email válido').isEmail(),
    body('password', 'Senha deve ter ao menos 5 caracteres').isLength({
      min: 5,
    }),
    body('cpfcnpj', 'Informe um CPF/CNPJ válido').notEmpty(),
  ],
  userController.update
);

router.delete('/users/:id', userController.delete);

// ADDRESS ROUTES
router.get('/users/:userId/address', addressController.index);
router.post(
  '/users/:userId/address',
  [
    body(['street', 'number', 'city', 'district', 'state'])
      .notEmpty()
      .withMessage('Preencha todos os campos'),
  ],
  addressController.store
);
router.put(
  '/users/:userId/address/:addressId',
  [
    body(['street', 'number', 'city', 'district', 'state'])
      .notEmpty()
      .withMessage('Preencha todos os campos'),
  ],
  addressController.update
);
router.delete(
  '/users/:userId/address/:addressId',
  [
    body(['street', 'number', 'city', 'district', 'state'])
      .notEmpty()
      .withMessage('Preencha todos os campos'),
  ],
  addressController.delete
);

module.exports = router;
