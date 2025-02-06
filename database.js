import { log } from "console";
import mysql from "mysql2";
import dotenv from "dotenv";
import Sequelize from "sequelize";
dotenv.config();

const database = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
  }
);


//mysql -u root -p -P 3307


export default database