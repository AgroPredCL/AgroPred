<<<<<<< HEAD
import { Router } from "express";

import { getUsos_Riegos,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoByCuartel } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/usos_riegos',getUsos_Riegos);

router.post('/uso_riego',createUso_Riego);

router.delete('/uso_riego/:fecha',deleteUso_Riego);

router.put('/uso_riego/:fecha',updateUso_Riego);

router.get('/uso_riego/:cuartel_ID', getUso_RiegoByCuartel);


=======
import { Router } from "express";

import { getUsos_Riegos,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoByCuartel } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/usos_riegos',getUsos_Riegos);

router.post('/uso_riego',createUso_Riego);

router.delete('/uso_riego/:id',deleteUso_Riego);

router.put('/uso_riego/:id',updateUso_Riego);

router.get('/uso_riego/:cuartel_ID/:fechaInicio/:fechaFin', getUso_RiegoByCuartel);


>>>>>>> origin/feature_fechas_tildes
export default router;