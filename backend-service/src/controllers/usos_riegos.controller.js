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
        const { fecha, hora, cuartelID, tipo_riego, tiempo_riego, litros_estimados, observacion } = req.body; 
        
        // Asegúrate de que la fecha esté en formato correcto
        const newUso_Riego = await Uso_Riego.create({
            fecha, // 'YYYY-MM-DD' o 'DD-MM-YYYY' según lo que esperes manejar
            hora,  // 'HH:MM:SS' o 'HH:MM' dependiendo del formato que estés usando
            cuartelID,
            tipo_riego, 
            tiempo_riego,
            litros_estimados,
            observacion
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
        const { cuartelID, tiempo_riego, litros_estimados, observacion } = req.body;
        
        const usoRiego = await Uso_Riego.findOne({
            where: {
                id
            }
        });
        
        if (!usoRiego) {
            return res.status(404).json({ message: 'Uso-riego not found' }); 
        }

        await usoRiego.update({
            cuartelID,
            tiempo_riego,
            litros_estimados,
            observacion
        });
        
        res.json({
            message: 'Uso-riego updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const getUso_RiegoByCuartel = async (req, res) => {
    try {
        const { cuartelID } = req.params;
        const { fechaInicio, fechaFin } = req.query;

        const whereClause = { cuartelID };

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
