import { Usarios } from "../models/usuarios.js";
import { toUpper } from "../utils/toUpper.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const obtenerUsuarios = async (req, res) => {
  try {
    const result = await Usarios.findAll({
      attributes: ["id", "username", "name", "last_name", "email", "password"],
    });
    res.json({
      message: "Lista de usuarios",
      data: result,
    });
  } catch (error) {
    console.error("El error esta en el metodo GET", error);
  }
};

export const crearUsuario = async (req, res) => {
  const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET);
  };

  try {
    const { username, name, last_name, email, password } = req.body;

    const user = { email };
    const accesstoken = generateAccessToken(user);
    await Usarios.create({
      username,
      name: toUpper(name),
      last_name: toUpper(last_name),
      email,
      password,
    });
    res.header("authorization", accesstoken);
    res.json({
      status: "success",
      message: "Usuario creado",
      token: accesstoken,
      data: [
        {
          username,
          name,
          last_name,
        },
      ],
    });
  } catch (error) {
    console.error("El error esta en el metodo POST", error);
    res.json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const useremail = await Usarios.findOne({ where: { email } });
    const userpassword = await Usarios.findOne({ where: { password } });

    if (useremail.id == userpassword.id) {
      if (email == useremail.email && password == userpassword.password) {
        const user = { email };
        const accesstoken = generateAccessToken(user);
        res.header("authorization", accesstoken);
        res.json({
          status: "success",
          message: `Welcome ${email}`,
          token: accesstoken,
        });
      } else {
        res.json({
          message: "Usuario no valido",
        });
      }
    } else {
      res.json({
        message: "Usuario no valido",
      });
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { username } = req.body;
    await Usarios.destroy({
      where: {
        username,
      },
    });
    res.json({
      message: `El usuario ${username} fue eliminado`,
    });
  } catch (error) {
    console.error("El error esta en el metodo DELETE", error);
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id, username, name, last_name, email, password } = req.body;
    const result = await Usarios.update(
      {
        username,
        name: toUpper(name),
        last_name: toUpper(last_name),
        email,
        password,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      message: `El usuario con el id = ${id} se actualizo`,
      data: result,
    });
  } catch (error) {
    console.error(`El error esta en el metodo PUT`, error);
  }
};
