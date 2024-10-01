import { Uso_Riego } from "../models/Uso_Riego.js";

export const getUsos_Riegos = async (req, res) => {
    try {
        const Uso_Riegos  = await Uso_Riego.findAll();
        res.json(Uso_Riegos);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createUso_Riego= async (req, res) => {
    try {
        const {fecha,cuartelID,tiempo_riego,litros_estimados,observacion} = req.body;
        const newUso_Riego= await Uso_Riego.create({
            fecha,
            cuartelID,
            tiempo_riego,
            litros_estimados,
            observacion          
        })
        res.json(newUso_Riego);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteUso_Riego = async (req, res) => {
    try {
        const {fecha} = req.params;
        const Uso_Riego = await Uso_Riego.findOne({
            where: {
                fecha
            }
        });
        await Uso_Riego.destroy();
        res.json({
            message: 'Uso-riego deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateUso_Riego = async (req, res) => {
    try {
        const {fecha} = req.params;
        const {cuartelID,tiempo_riego,litros_estimados,observacion} = req.body;
        const Uso_Riego = await Uso_Riego.findOne({
            where: {
                fecha
            }
        });
        await Uso_Riego.update({
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
            data: {error}
        });
    }
}


export const getUso_RiegoByFecha = async (req, res) => {
    try {
        const {fecha} = req.params;
        const Uso_Riego = await Uso_Riego.findOne({
            where: {
                fecha
            }
        });
        res.json(Uso_Riego);
    } catch (error) {
        res.status(500).json({ 
            message: 'Something went wrong',
            data: {error}
        });
    }
}