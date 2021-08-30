const User = require('../models/User');
const Address = require('../models/Address');
const { validationResult } = require('express-validator');

module.exports = {
  async index(req, res, next) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, {
        include: { association: 'address' },
      });
      if (!user) {
        const error = new Error('Nenhum usuário encontrado');
        error.statusCode = 404;
        throw error;
      }
      user.password = undefined;
      return res.status(200).json({
        status: 1,
        user,
      });
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    const { street, number, city, district, state } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 0,
        message: errors.array()[0].msg,
      });
    }
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        const error = new Error('Usuário não encontrado');
        error.statusCode = 404;
        throw error;
      }

      const address = await Address.create({
        street,
        number,
        city,
        district,
        state,
        user_id: req.user_id,
      });
      return res.status(201).json({
        status: 1,
        message: 'Endereço cadastrado com sucesso',
        address,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {},

  async delete() {},
};
