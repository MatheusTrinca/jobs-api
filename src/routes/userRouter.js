const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/login',
  [body('email', 'Este não é um email válido').isEmail()],
  userController.login
);

router.post(
  '/',
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

router.use(authMiddleware);

router.get('/', userController.index);

router.put(
  '/:id',
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

router.delete('/:id', userController.delete);

module.exports = router;
