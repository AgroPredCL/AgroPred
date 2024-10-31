import {Router} from 'express'
import {getUbicaciones, createUbicacion, updateUbicacion, deleteUbicacion, getUbicacionById} from '../controllers/ubicaciones.controller.js'


const router = Router()

router.get('/ubicaciones', getUbicaciones);

router.post('/ubicacion', createUbicacion);

router.put('/ubicacion/:id', updateUbicacion);

router.delete('/ubicacion/:id', deleteUbicacion);

router.get('/ubicacion/:id', getUbicacionById);


export default router;