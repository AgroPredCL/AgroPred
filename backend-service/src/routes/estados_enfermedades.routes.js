import { Router } from "express";
import { getEstados_Enfermedades,createEstado_Enfermedad,deleteEstado_Enfermedad,getEstado_EnfermedadById } from "../controllers/estados_enferms.controller.js";


const router = Router();

router.get('/estados_enfermedades',getEstados_Enfermedades);

router.post('/estado_enfermedad',createEstado_Enfermedad);

router.delete('/estado_enfermedad/:id_estado/:nom_enfermedad',deleteEstado_Enfermedad);

router.get('/estado_enfermedad/:id_estado',getEstado_EnfermedadById);

export default router;