require('dotenv').config();

module.exports = {
  host: 'localhost',
  dialect: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'jobs',
  define: {
    timestamps: true,
    underscored: true,
  },
};
