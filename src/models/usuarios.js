import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

export const Usarios = sequelize.define(
  'Usuarios',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [8,35],
          msg: 'El username debe tener entre 8 y 35 caracteres'
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [2,25],
          msg: 'El name debe tener entre 2 y 35 caracteres'
        },
        isAlpha: {
          args: true,
          msg: 'El name debe contener solo letras',
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [3,35],
          msg: 'El lastname debe tener entre 3 y 35 caracteres'
        },
        isAlpha: {
          args: true,
          msg: 'El lastname debe contener solo letras',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'El email debe ser asi: ejemplo@deemail.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo no puede ser nulo'
        },
        len: {
          args: [8,35],
          msg: 'El password debe tener entre 8 y 35 caracteres'
        },
      },
    },
  },
  {
    timestamps: true,
  }
);
