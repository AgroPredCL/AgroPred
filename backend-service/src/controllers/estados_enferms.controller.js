import { Estado_Enfermedad } from "../models/Estado_Enfermedad.js";
import moment from 'moment';

export const getEstados_Enfermedades = async (req, res) => {
    try {
        const estados_enfermedades = await Estado_Enfermedad.findAll();
        
        res.json(estados_enfermedades);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createEstado_Enfermedad = async (req, res) => {
    try {
        const {id_estado,nom_enfermedad} = req.body;
        const newEstado_Enfermedad = await Estado_Enfermedad.create({
            id_estado,
            nom_enfermedad
        })
        res.json(newEstado_Enfermedad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteEstado_Enfermedad = async (req, res) => {
    try {
        const {id_estado,nom_enfermedad} = req.params;
        const estado_enfermedad = await Estado_Enfermedad.findOne({
            where: {
                id_estado,
                nom_enfermedad
            }
        });
        await estado_enfermedad.destroy();
        res.json({
            message: 'Estado_Enfermedad deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const getEstado_EnfermedadById = async (req, res) => {
    try {
        const {id_estado} = req.params;
        const estado_enfermedad = await Estado_Enfermedad.findOne({
            where: {
                id_estado
            }
        });
        res.json(estado_enfermedad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}