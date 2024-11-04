import { Router } from "express";

import { getUsos_RiegosByCuartel ,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoByCuartelFecha } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/uso_riego/:cuartel_ID',getUsos_RiegosByCuartel);

router.post('/uso_riego',createUso_Riego);

router.delete('/uso_riego/:id',deleteUso_Riego);

router.put('/uso_riego/:id',updateUso_Riego);

router.get('/uso_riego/:cuartel_ID/:fechaInicio/:fechaFin', getUso_RiegoByCuartelFecha);


export default router;