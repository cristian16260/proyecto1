import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  login,
} from '../controller/usuariosController.js';

import { Router } from 'express';

const router = Router();

router.get('/obtenerUsuarios', obtenerUsuarios);
router.post('/crearUsuario', crearUsuario);
router.post('/login', login);
router.delete('/eliminarUsuario', eliminarUsuario);
router.put('/actualizarUsuario', actualizarUsuario);


export default router;
