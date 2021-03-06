const express = require('express');
require('dotenv').config();

require('./database');

const apiRouter = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

const PORT = process.env.SERVER_PORT;

app.use((error, req, res, next) => {
  console.log(error);
  const code = error.statusCode || 500;
  const message = error.message;
  res.status(code).json({
    status: 0,
    message,
  });
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
