const User = require('../models/User');

module.exports =
  (...roles) =>
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return next();
      }
      if (!roles.includes(user.role)) {
        const error = new Error('Uso restrito usuário administrativo');
        error.statusCode = 401;
        throw error;
      }

      return next();
    } catch (err) {
      next(err);
    }
  };
