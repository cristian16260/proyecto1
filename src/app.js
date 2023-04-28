import express from 'express';
import userRoutes from './routes/usersRoutes.js';
import morgan from 'morgan';
import { sequelize } from './config/dataBase.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(morgan('dev'));

// rutas de usuarios
app.use('/usuario', userRoutes);

export const connection = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connection();
