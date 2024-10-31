import {Router} from 'express'
import { getRol_Usuarios,createRol_Usuario,deleteRol_Usuario,updateRol_Usuario_rol,getRol_UsuarioByEmail } from '../controllers/roles_usuarios.controller.js'



const router = Router()

router.get('/rol_usuarios',getRol_Usuarios);

router.post('/rol_usuario',createRol_Usuario);

router.put('/rol_usuario/:email',updateRol_Usuario_rol);

router.delete('/rol_usuario/:email/:rol_user',deleteRol_Usuario);

router.get('/rol_usuario/:email',getRol_UsuarioByEmail);

export default router;