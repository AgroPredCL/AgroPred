import {Router} from 'express'
import {getTasks, createTask, updateTask, deleteTask, getTaskById} from '../controllers/tasks.controller.js'

const router = Router()

router.get('/tasks', getTasks);

router.post('/task', createTask);

router.put('/task/:id', updateTask);

router.delete('/task/:id', deleteTask);

router.get('/task/:id', getTaskById);


export default router;