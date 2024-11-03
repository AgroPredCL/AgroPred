import {Router} from 'express'
import {getUsuarios,createUsuario,updateUsuario,deleteUsuario,getUsuarioByRut} from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsuarios);

router.post('/usuario', createUsuario);

router.put('/usuario/:rut', updateUsuario);

router.delete('/usuario/:rut', deleteUsuario);

router.get('/usuario/:rut', getUsuarioByRut);

export default router; 