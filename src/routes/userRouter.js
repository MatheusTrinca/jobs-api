const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');

const router = express.Router();

router.get('/', userController.index);
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

module.exports = router;
