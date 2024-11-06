import { Contratista } from "../models/Contratista.js";
import { Cuartel } from "../models/Cuartel.js";
import { Enfermedad } from "../models/Enfermedad.js"; 
import { Estado_Enfermedad } from "../models/Estado_Enfermedad.js";
import { Estado } from "../models/Estado.js";
import { Inventario } from "../models/Inventario.js";
import {Predio} from '../models/Predio.js';
import { Producto } from "../models/Producto.js";
import { Rol_Usuario } from "../models/Rol_Usuario.js";
import { Rol } from "../models/Rol.js";
import {Ubicacion} from '../models/Ubicacion.js';

import { Uso_Fertilizante } from "../models/Uso_Fertilizante.js";
import { Uso_Riego } from "../models/Uso_Riego.js";
import { Usuario } from "../models/Usuario.js";

import sequelize from '../database/database.js';

export const poblar_BaseDatos = async (req, res) => {
    const transaction = await sequelize.transaction();  // Iniciamos una transacción

    try {
        // Extraemos los datos de req.body, organizándolos por tabla
        const {
            //----------------------- Predio 
            nombre_predio,
            area_predio,
            //------------------------ Ubicacion 
            calle_ubicacion,
            codigo_Postal_ubicacion,
            comuna_ubicacion,
            numero_ubicacion,
            region_ubicacion,
            //----------------------- Usuario 
            email_usuario,
            rut_usuario,
            full_name_usuario,
            num_telefono_usuario,
            password_usuario,
            rol_usuario,
            //---------------------- Inventario
            categoria_inventario,
            //---------------------- Contratista
            rut_contratista,
            fecha_contrato,
            cant_empleados_contratista,
            costo_contratista,
            descrpicion_contratista,
            email_contratista,
            email_empresa,
            estado,
            full_name_contratista,
            nom_empresa_contratista,
            num_telefono_contratista,
            num_telefono_empresa,
            //-----------------------Producto 
            cantidad_producto,
            descripcion_producto,
            estado_producto,
            nombre_producto,
            ubicacion_producto,
            //-----------------------Cuartel 
            nombre_Cuartel,
            area_cuartel,
            cant_paltos_cuartel,
            caudal_emisor_cuartel,
            coeficiente_uniformidad,
            eficiencia_riego,
            factor_area_sombreada,
            marco_plantacion,
            numero_emisores_planta,
            piedras_perfil_suelo,
            porcentaje_suelo_emisores,
            profundidad_raices,
            retencion_agua_suelo,
            tipo_planta,
            umbral_riego,
            //---------------------Uso Riego
            fecha_riego,
            hora_riego,
            litros_estimados,
            observacion_riego,
            tiempo_riego,
            tipo_riego,
            //-------------------- Uso Fertilizante
            fecha_fertiliznante,
            hora_fertilizante,
            observacion_fertilizante,
            tipo_fertilizante,
            //-------------------- Estado 
            fecha_estado,
            hora_estado,
            conductividad,
            fosforo,
            humedad,
            nitrogeno,
            ph,
            potasio,
            temperatura,
            //----------------------Enfermedad
            nombre_enfermedad,
            descripcion_enfermedad
            //-------------------- Estado_Enfermedad

        } = req.body;


        // Poblar tabla Predio
        const newPredio = await Predio.create({
            nombre: nombre_predio,  
            area: area_predio

        }, { transaction });


        // Poblar tabla Ubicacion
        const newUbicacion = await Ubicacion.create({
            nom_predio: nombre_predio,
            calle: calle_ubicacion,
            codigo_Postal: codigo_Postal_ubicacion,
            comuna: comuna_ubicacion,
            numero: numero_ubicacion,
            region: region_ubicacion 
            
        }, { transaction });

        // Poblar tabla Usuario
        const newUsuario = await Usuario.create({
            email: email_usuario,
            rut: rut_usuario,
            nom_predio: nombre_predio,
            full_name: full_name_usuario,
            num_telefono: num_telefono_usuario,
            password: password_usuario,
            rol: rol_usuario

        }, { transaction });

        // Poblar tabla Rol
        const newRol = await Rol.create({
            rol_user: rol_usuario
   

        }, {transaction});

        // Poblar tabla Rol-Usuario 
        const newRol_Usuario = await Rol_Usuario.create({
            rol_user: rol_usuario,
            rut: rut_usuario

        }, {transaction});

        // Poblar tabla Inventario
        const newInventario = await Inventario.create({
            categoria: categoria_inventario,
            nom_predio: nombre_predio

        }, {transaction});

        // Poblar tabla Contratista 
        const newContratista = await Contratista.create({
            rut: rut_contratista,
            nom_predio: nombre_predio,
            fecha_contrato: fecha_contrato,
            cant_empleados: cant_empleados_contratista,
            costo: costo_contratista,
            descripcion: descrpicion_contratista,
            email: email_contratista,
            email_empresa: email_empresa,
            estado: estado,
            full_name: full_name_contratista,
            nom_empresa: nom_empresa_contratista,
            num_telefono: num_telefono_contratista,
            num_telefono_empresa: num_telefono_empresa
            

        }, {transaction});

        // Poblar tabla Producto
        const newProducto = await Producto.create({
            categoria: categoria_inventario,
            cantidad: cantidad_producto,
            descripcion: descripcion_producto,
            estado: estado_producto,
            nombre: nombre_producto,
            ubicacion: ubicacion_producto

        }, {transaction});

        //Poblar tabla Cuartel 
        const newCuartel = await Cuartel.create({
            nombre_Cuartel: nombre_Cuartel,
            nom_predio: nombre_predio,
            area: area_cuartel,
            cant_paltos: cant_paltos_cuartel,
            caudal_emisor: caudal_emisor_cuartel,
            coeficiente_uniformidad: coeficiente_uniformidad,
            eficiencia_riego: eficiencia_riego,
            factor_area_sombreada: factor_area_sombreada,
            marco_plantacion: marco_plantacion,
            numero_emisores_planta: numero_emisores_planta,
            piedras_perfil_suelo: piedras_perfil_suelo,
            porcentaje_suelo_emisores: porcentaje_suelo_emisores,
            profundidad_raices: profundidad_raices,
            retencion_agua_suelo: retencion_agua_suelo,
            tipo_planta: tipo_planta,
            umbral_riego: umbral_riego

        }, {transaction});

        //Poblar tabla Uso Riego
        const newUsoRiego = await Uso_Riego.create({
            cuartel_ID: nombre_Cuartel,
            fecha: fecha_riego,
            hora: hora_riego,
            litros_estimados: litros_estimados,
            observacion: observacion_riego,
            tiempo_riego: tiempo_riego,
            tipo_riego: tipo_riego

        }, {transaction});

        //Poblar tabla Uso_Fertilizante
        const newUsoFertilizante = await Uso_Fertilizante.create({
            cuartel_ID: nombre_Cuartel,
            fecha: fecha_fertiliznante,
            hora: hora_fertilizante,
            observacion: observacion_fertilizante,
            tipo: tipo_fertilizante

        }, {transaction});

        //Poblar tabla Estado
        const newEstado = await Estado.create({
            fecha: fecha_estado,
            hora: hora_estado,
            cuartel_ID: nombre_Cuartel,
            conductividad: conductividad,
            fosforo: fosforo,
            humedad: humedad,
            nitrogeno: nitrogeno,
            ph: ph,
            potasio: potasio,
            temperatura: temperatura

        }, {transaction});

        //Poblar tabla Enfermedad
        const newEnfermedad = await Enfermedad.create({
            nombre: nombre_enfermedad,
            descripcion: descripcion_enfermedad

        }, {transaction});

        //Poblar tabla Estado_Enfermedad
        const newEstadoEnfermedad = await Estado_Enfermedad.create({
            id_estado: newEstado.id ,
            nom_enfermedad: nombre_enfermedad

        }, {transaction});

        // Confirmar la transacción
        await transaction.commit();

        // Enviar respuesta con los datos insertados
        res.json({
            message: 'Base de datos poblada con éxito',
            predio: newPredio,
            ubicacion: newUbicacion,
            usuario: newUsuario,
            rol: newRol,
            rol_usuario: newRol_Usuario,
            inventario: newInventario,
            contratista: newContratista,
            producto: newProducto,
            cuartel: newCuartel,
            uso_riego: newUsoRiego,
            uso_fertilizante: newUsoFertilizante,
            estado: newEstado,
            enfermedad: newEnfermedad,
            estadoEnfermedad: newEstadoEnfermedad
        });

    } catch (error) {
        // Si hay un error, revertimos la transacción
        await transaction.rollback();

        // Enviamos el error al cliente
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
};
