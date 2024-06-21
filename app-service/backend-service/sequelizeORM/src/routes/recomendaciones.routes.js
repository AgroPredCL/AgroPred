import { Router } from "express";
import { getRecomendaciones,createRecomendacion,deleteRecomendacion,updateRecomendacion,getRecomendacionByNombre } from "../controllers/recomendaciones.controller.js";

const router = Router()

router.get('/recomendaciones',getRecomendaciones);

router.post('/recomendacion',createRecomendacion);

router.put('/recomedacion/:nombre',updateRecomendacion);

router.delete('/recomedacion/:nombre',deleteRecomendacion);

router.get('/recomedacion/:nombre',getRecomendacionByNombre);

export default router;