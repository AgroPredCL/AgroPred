import {Router} from 'express'
import {getUsuarios,createUsuario,updateUsuario,deleteUsuario,getUsuarioByEmail} from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsuarios);

router.post('/usuario', createUsuario);

router.put('/usuario/:email', updateUsuario);

router.delete('/usuario/:email', deleteUsuario);

router.get('/usuario/:email', getUsuarioByEmail);

export default router; 