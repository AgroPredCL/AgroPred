import { Uso_Riego } from "../models/Uso_Riego.js";
import { Op } from 'sequelize';

export const getUsos_Riegos = async (req, res) => {
    try {
        const usosRiegos = await Uso_Riego.findAll();
        res.json(usosRiegos);
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
        const newUso_Riego = await Uso_Riego.create({
            cuartel_ID,
            fecha,
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
        const usoRiego = await Uso_Riego.findOne({
            where: {
                id
            }
        });
        
        if (!usoRiego) {
            return res.status(404).json({ message: 'Uso-riego not found' });
        }

        await usoRiego.destroy();
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
        const { cuartel_ID } = req.params;
        const { fechaInicio, fechaFin } = req.query;

        const whereClause = { cuartel_ID };

        // Convertir las fechas al formato correcto para la comparación
        if (fechaInicio && fechaFin) {
            whereClause.fecha = {
                [Op.between]: [fechaInicio, fechaFin] // Usa fechas en formato 'YYYY-MM-DD'
            };
        }

        const usosRiego = await Uso_Riego.findAll({
            where: whereClause
        });

        res.json(usosRiego);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};
