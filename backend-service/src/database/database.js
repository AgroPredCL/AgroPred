import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://postgres:1234@db:5432/agropred');

export default  sequelize ;

/*
export const sequelize = new Sequelize(
    'agropred', 
    'postgres', 
    '1234', {
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
        freezeTableName: true // Deshabilita la pluralización globalmente
      }
});
*/

/*
// config/database.js
module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'agropred',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '5432',
    dialect: 'postgres',
  },
  // Other environments (test, production) can be configured similarly
};
*/