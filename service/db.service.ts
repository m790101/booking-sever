const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://haowencheng:@localhost:5432/booking?sslmode=disable') // Example for postgres



export default sequelize