import express from 'express';

import prediosRoutes from './routes/predios.routes.js'
import ubicacionesRoutes from './routes/ubicaciones.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import rol_usuarioRoutes from './routes/rol_usuario.routes.js'
import rolRoutes from './routes/rol.routes.js'
import cuartelesRoutes from './routes/cuarteles.routes.js'
import estadosRoutes from './routes/estados.routes.js'
import estados_enfermedadesRoutes from './routes/estados_enfermedades.routes.js'
import enfermedadesRoutes from './routes/enfermedades.routes.js'
import usos_fertilizantesRoutes from './routes/usos_fertilizantes.routes.js'
import usos_riegosRoutes from './routes/usos_riegos.routes.js'
import productosRoutes from './routes/productos.routes.js'
import contratistasRoutes from './routes/contratistas.routes.js'
import inventariosRoutes from './routes/inventarios.routes.js'

import poblamientoRoutes from './routes/poblamiento.routes.js'

const app = express();


app.use(express.json());

app.use(poblamientoRoutes);


app.use(prediosRoutes);
app.use(ubicacionesRoutes);
app.use(usuariosRoutes);
app.use(rol_usuarioRoutes);
app.use(rolRoutes);
app.use(cuartelesRoutes);
app.use(estadosRoutes);
app.use(estados_enfermedadesRoutes);
app.use(enfermedadesRoutes);
app.use(usos_fertilizantesRoutes);
app.use(usos_riegosRoutes);
app.use(productosRoutes);
app.use(contratistasRoutes);
app.use(inventariosRoutes);

export default app;