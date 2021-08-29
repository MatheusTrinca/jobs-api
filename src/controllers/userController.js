const User = require('../models/User');
const { cnpj, cpf } = require('cpf-cnpj-validator');
const { validationResult } = require('express-validator');

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'cpfcnpj'],
      },
    });
    if (users === '' || users === null) {
      return res.status(200).json({ message: 'Nenhum usuário cadastrado' });
    }
    return res.status(200).json({ users });
  },

  async store(req, res, next) {
    const { name, email, password, passwordConfirm, cpfcnpj } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 0,
        message: errors.array()[0].msg,
      });
    }
    try {
      const hasUser = await User.findOne({ where: { email: email } });
      if (hasUser) {
        const error = new Error('Usuário ou E-mail já cadastrado');
        error.statusCode = 422;
        throw error;
      }
      if (password !== passwordConfirm) {
        const error = new Error('Dados inválidos');
        error.statusCode = 400;
        throw error;
      }
      if (!cpf.isValid(cpfcnpj) && !cnpj.isValid(cpfcnpj)) {
        const error = new Error('Dados inválidos');
        error.statusCode = 400;
        throw error;
      }
      const user = await User.create({ name, email, password, cpfcnpj });
      return res.status(201).json({
        status: 1,
        message: 'Usuário cadastrado com sucesso',
        user: {
          name: user.name,
          email: user.email,
          cpfcnpj: user.cpfcnpj,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    const { name, email, password, passwordConfirm, cpfcnpj } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 0,
        message: errors.array()[0].msg,
      });
    }
    try {
      if (password !== passwordConfirm) {
        const error = new Error('Dados inválidos');
        error.statusCode = 400;
        throw error;
      }
      if (!cpf.isValid(cpfcnpj) && !cnpj.isValid(cpfcnpj)) {
        const error = new Error('Dados inválidos');
        error.statusCode = 400;
        throw error;
      }
      const updatedUser = await User.update(
        { name, email, password, cpfcnpj },
        {
          where: { id: req.params.id },
        }
      );
      return res.status(200).json({
        status: 1,
        message: 'Usuário atualizado com sucesso',
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res) {},
};
