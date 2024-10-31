import { Router } from "express";
import { getContratistas,createContratista,deleteContratista,updateContratista,getContratistaByRut} from "../controllers/contratistas.controller.js";


const router = Router();

router.get('/contratistas',getContratistas);

router.post('/contratista',createContratista);

router.delete('/contratista/:rut',deleteContratista);

router.put('/contratista/:rut',updateContratista);

router.get('/contratista/:rut',getContratistaByRut);

export default router