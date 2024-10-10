import { Router } from "express";

import { getCuarteles,createCuartel,deleteCuartel,updateCuartel,getCuartelByNombre } from "../controllers/cuarteles.controller.js";


const router = Router();

router.get('/cuarteles',getCuarteles);

router.post('/cuartel',createCuartel);

router.delete('/cuartel/:nombre_Cuartel',deleteCuartel);

router.put('/cuartel/:nombre_Cuartel',updateCuartel);

router.get('/cuartel/:nombre_Cuartel',getCuartelByNombre);

export default router;