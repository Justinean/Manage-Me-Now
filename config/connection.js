const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Will make sure if we are using a deployed server that it uses those enviromental variables.
if (process.env.JAWSDB_BLACK_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_BLACK_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;