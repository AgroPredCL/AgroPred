import { Router } from "express";
import { getEstados,createEstado,deleteEstado,updateEstado,getEstadoByFecha } from "../controllers/estados.controller.js";


const router = Router()

router.get('/estados',getEstados);

router.post('/estado',createEstado);

router.delete('/estado/:fecha',deleteEstado);

router.put('/estado/:fecha',updateEstado);

router.get('/estado/:fecha',getEstadoByFecha);


export default router;