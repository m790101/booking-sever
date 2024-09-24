const { Sequelize } = require('sequelize');
import dotenv from "dotenv";
import pg from "pg"
dotenv.config();
// const sequelize = new Sequelize('postgres://haowencheng:@localhost:5432/booking?sslmode=disable') // Example for postgres

const sequelize = new Sequelize({
    dialect: 'postgres',
    database:'postgres',
    username:'postgres.vwsolxixsbjncvaztcyk',
    password:process.env.DB_PASSWORD,
    dialectModule: pg,
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    port:6543,
  });
export default sequelize