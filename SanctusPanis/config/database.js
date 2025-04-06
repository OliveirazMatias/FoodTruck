import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";
import Sequelize from "sequelize";


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