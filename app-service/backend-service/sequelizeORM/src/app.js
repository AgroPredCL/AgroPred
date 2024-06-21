import express from 'express';

import prediosRoutes from './routes/predios.routes.js'
import ubicacionesRoutes from './routes/ubicaciones.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import rol_usuarioRoutes from './routes/rol_usuario.routes.js'
import cuartelesRoutes from './routes/cuarteles.routes.js'
import estadosRoutes from './routes/estados.routes.js'
import recomedacionesRoutes from './routes/recomendaciones.routes.js'
import estados_enfermedadesRoutes from './routes/estados_enfermedades.routes.js'
import enfermedadesRoutes from './routes/enfermedades.routes.js'
import usos_recursosRoutes from './routes/usos_recursos.routers.js'
import productosRoutes from './routes/productos.routes.js'
import contratistasRoutes from './routes/contratistas.routes.js'
import inventariosRoutes from './routes/inventarios.routes.js'
const app = express();


app.use(express.json());


app.use(prediosRoutes);
app.use(ubicacionesRoutes);
app.use(usuariosRoutes);
app.use(rol_usuarioRoutes);
app.use(cuartelesRoutes);
app.use(estadosRoutes);
app.use(recomedacionesRoutes);
app.use(estados_enfermedadesRoutes);
app.use(enfermedadesRoutes);
app.use(usos_recursosRoutes);
app.use(productosRoutes);
app.use(contratistasRoutes);
app.use(inventariosRoutes);

export default app;