import {Router} from 'express'
import {getPredios, createPredio, updatePredio, deletePredio, getPredioById} from '../controllers/predios.controller.js'


const router = Router()

router.get('/predios', getPredios);

router.post('/predio', createPredio);

router.put('/predio/:id', updatePredio);

router.delete('/predio/:id', deletePredio);

router.get('/predio/:id', getPredioById);


export default router;