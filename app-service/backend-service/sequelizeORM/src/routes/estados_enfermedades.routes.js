import { Router } from "express";
import { getEstados_Enfermedades,createEstado_Enfermedad,deleteEstado_Enfermedad,getEstado_EnfermedadByFecha } from "../controllers/estados_enferms.controller.js";


const router = Router();

router.get('/estados_enfermedades',getEstados_Enfermedades);

router.post('/estado_enfermedad',createEstado_Enfermedad);

router.delete('/estado_enfermdad/:fecha_estado',deleteEstado_Enfermedad);

router.get('/estado_enfermedad/:fecha_estado',getEstado_EnfermedadByFecha);

export default router;