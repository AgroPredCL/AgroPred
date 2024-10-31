import { Uso_Riego } from "../models/Uso_Riego.js";
import { Op } from 'sequelize';
import moment from 'moment';

export const getUsos_RiegosByCuartel = async (req, res) => {
    try {
        const { cuartel_ID} = req.params;
        const usosRiegos = await Uso_Riego.findAll({
            where: {
                cuartel_ID
            }
    });

        const formattedRiego = usosRiegos.map(uso_riego => {
            return {
                ...uso_riego.toJSON(),
                fecha: moment(uso_riego.fecha).format('DD-MM-YYYY')
            };
        });

        res.json(formattedRiego);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const createUso_Riego = async (req, res) => {
    try {
        const {cuartel_ID,fecha,hora,litros_estimados,observacion,tiempo_riego,tipo_riego } = req.body; 
        
        // Asegúrate de que la fecha esté en formato correcto
        const formattedFecha = moment(fecha, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const newUso_Riego = await Uso_Riego.create({
            cuartel_ID,
            fecha: formattedFecha,
            hora,
            litros_estimados,
            observacion,
            tiempo_riego,
            tipo_riego
        });
        res.status(201).json(newUso_Riego);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const deleteUso_Riego = async (req, res) => {
    try {
        const { id } = req.params; 
        const usoriego = await Uso_Riego.findOne({
            where: {
                id
            }
        });
        
        if (!usoriego) {
            return res.status(404).json({ message: 'Uso-riego not found' });
        }

        await usoriego.destroy();
        res.json({
            message: 'Uso-riego deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const updateUso_Riego = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const usoRiego = await Uso_Riego.findOne({ where: { id } });

        if (!usoRiego) {
            return res.status(404).json({ message: 'Uso-riego not found' });
        }

        // Filtrar el objeto para eliminar cualquier campo que tenga un valor indefinido
        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([key, value]) => value !== undefined)
        );

        if (filteredData.fecha) {
            filteredData.fecha = moment(filteredData.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        // Si no hay campos válidos para actualizar, enviar error
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Actualizar solo los campos proporcionados
        await usoRiego.update(filteredData);

        res.json({ message: 'Uso-riego updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const getUso_RiegoByCuartel = async (req, res) => {
    try {
        const { cuartel_ID,fechaInicio,fechaFin} = req.params;
     
        const whereClause = { cuartel_ID };

        // Convertir las fechas al formato correcto para la comparación
        if (fechaInicio && fechaFin) {
            const formattedFechaInicio = moment(fechaInicio, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const formattedFechaFin = moment(fechaFin, 'DD-MM-YYYY').format('YYYY-MM-DD');

            whereClause.fecha = {
                [Op.between]: [formattedFechaInicio, formattedFechaFin] // Usar fechas en formato 'YYYY-MM-DD'
            };
        }

        const usosRiego = await Uso_Riego.findAll({
            where: whereClause
        });

        // Formatear las fechas para la respuesta en DD-MM-YYYY
        const formattedUsosRiego = usosRiego.map(usoRiego => {
            const usoRiegoData = usoRiego.toJSON();
            usoRiegoData.fecha = moment(usoRiegoData.fecha).format('DD-MM-YYYY');
            return usoRiegoData;
        });

        res.json(formattedUsosRiego);

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};
 
