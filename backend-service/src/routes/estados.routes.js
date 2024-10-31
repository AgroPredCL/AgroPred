<<<<<<< HEAD
import { Router } from "express";
import { getEstados,createEstado,deleteEstado,updateEstado,getEstadoByFecha } from "../controllers/estados.controller.js";


const router = Router()

router.get('/estados',getEstados);

router.post('/estado',createEstado);

router.delete('/estado/:fecha',deleteEstado);

router.put('/estado/:fecha',updateEstado);

router.get('/estado/:fecha',getEstadoByFecha);


=======
import { Router } from "express";
import { getEstados,createEstado,deleteEstado,updateEstado, getEstadoById } from "../controllers/estados.controller.js";


const router = Router()

router.get('/estados',getEstados);

router.post('/estado',createEstado);

router.delete('/estado/:id/:cuartel_ID',deleteEstado);

router.put('/estado/:id/:cuartel_ID',updateEstado);

router.get('/estado/:id/:cuartel_ID',getEstadoById);


>>>>>>> origin/feature_fechas_tildes
export default router;