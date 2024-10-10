import { Router } from "express";

import { getUsos_Riegos,createUso_Riego,deleteUso_Riego,updateUso_Riego,getUso_RiegoByCuartel } from "../controllers/usos_riegos.controller.js";


const router = Router();

router.get('/usos_riegos',getUsos_Riegos);

router.post('/uso_riego',createUso_Riego);

router.delete('/uso_riego/:fecha',deleteUso_Riego);

router.put('/uso_riego/:fecha',updateUso_Riego);

router.get('/uso_riego/:cuartel_ID', getUso_RiegoByCuartel);


export default router;