import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    'agropred', 
    'postgres', 
    '1234', {
    host: '127.0.0.1',
    dialect: 'postgres'
});