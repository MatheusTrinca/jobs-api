const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    if (users === '' || users === null) {
      return res.status(200).json({ message: 'Nenhum usuário cadastrado' });
    }
    return res.status(200).json({ users });
  },

  async store(req, res, next) {
    const { name, email, password, passwordConfirm } = req.body;
    try {
      if (!name || !email || !password || !passwordConfirm) {
        const error = new Error('Dados faltantes');
        error.statusCode = 422;
        throw error;
      }
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
      const user = await User.create({ name, email, password });
      return res.status(201).json({
        status: 1,
        message: 'Usuário cadastrado com sucesso',
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res) {},

  async delete(req, res) {},
};
