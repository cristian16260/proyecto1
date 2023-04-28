import Sequelize from 'sequelize';

import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'us-east.connect.psdb.cloud',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

