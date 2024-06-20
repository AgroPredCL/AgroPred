import express from 'express';
import projectsRoutes from './routes/projects.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import prediosRoutes from './routes/predios.routes.js'
import ubicacionesRoutes from './routes/ubicaciones.routes.js'

const app = express();


app.use(express.json());

app.use(projectsRoutes);
app.use(tasksRoutes);
app.use(prediosRoutes);
app.use(ubicacionesRoutes);

export default app;