const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error('Token não enviado');
    error.statusCode = 401;
    throw error;
  }
  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    const error = new Error('Erro no token');
    error.statusCode = 401;
    throw error;
  }
  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) {
    const error = new Error('Token malformado');
    error.statusCode = 401;
    throw error;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      const error = new Error('Token inválido');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decoded.id;
    return next();
  });
};
