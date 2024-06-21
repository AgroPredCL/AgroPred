import express from 'express';

import prediosRoutes from './routes/predios.routes.js'
import ubicacionesRoutes from './routes/ubicaciones.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import rol_usuarioRoutes from './routes/rol_usuario.routes.js'
import cuartelesRoutes from './routes/cuarteles.routes.js'
import estadosRoutes from './routes/estados.routes.js'
const app = express();


app.use(express.json());


app.use(prediosRoutes);
app.use(ubicacionesRoutes);
app.use(usuariosRoutes);
app.use(rol_usuarioRoutes);
app.use(cuartelesRoutes);
app.use(estadosRoutes);

export default app;