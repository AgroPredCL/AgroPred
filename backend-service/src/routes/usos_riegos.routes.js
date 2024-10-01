import { Router } from "express";

import { getUsos_Riegos,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoByFecha } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/usos_riegos',getUsos_Riegos);

router.post('/uso_riego',createUso_Riego);

router.delete('/uso_riego/:fecha',deleteUso_Riego);

router.put('/uso_riego/:fecha',updateUso_Riego);

router.get('/uso_riego/:fecha',getUso_RiegoByFecha);

export default router;