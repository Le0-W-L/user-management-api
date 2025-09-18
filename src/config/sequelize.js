const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB, 
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        port: process.env.MYSQL_PORT,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;