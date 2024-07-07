import {Router} from 'express';
import { getEnfermedades,createEnfermedad,deleteEnfermedad,updateEnfermedad,getEnfermedadByNombre } from '../controllers/enfermedades.controler.js';

const router = Router()

router.get('/enfermedades',getEnfermedades);

router.post('/enfermedad',createEnfermedad);

router.delete('/enfermedad/:nombre',deleteEnfermedad);

router.put('/enfermedad/:nombre',updateEnfermedad);

router.get('/enfermedad/:nombre',getEnfermedadByNombre);

export default router;
