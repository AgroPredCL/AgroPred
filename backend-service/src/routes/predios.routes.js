import {Router} from 'express'
import {getPredios, createPredio, updatePredio, deletePredio, getPredioById} from '../controllers/predios.controller.js'


const router = Router()

router.get('/predios', getPredios);

router.post('/predio', createPredio);

router.put('/predio/:nombre', updatePredio);

router.delete('/predio/:nombre', deletePredio);

router.get('/predio/:nombre', getPredioById);


export default router;