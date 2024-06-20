import {Router} from 'express'
import {getProjects, createProject, updateProject, deleteProject, getProjectById} from '../controllers/projects.controller.js'


const router = Router()

router.get('/projects', getProjects);

router.post('/project', createProject);

router.put('/project/:id', updateProject);

router.delete('/project/:id', deleteProject);

router.get('/project/:id', getProjectById);


export default router;