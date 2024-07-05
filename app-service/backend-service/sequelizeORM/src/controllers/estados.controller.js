import { Estado } from "../models/Estado.js";


export const getEstados = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}



export const createEstado= async (req, res) => {
    try {
        const {fecha,cuartelID,conductividad,humedad,ph,temperatura,nitrogeno,fosforo,potasio} = req.body;
        const newEstado = await Estado.create({
            fecha,
            cuartelID,
            conductividad,
            humedad,
            ph,
            temperatura,
            nitrogeno,
            fosforo,
            potasio
            
        })
        res.json(newEstado);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteEstado = async (req, res) => {
    try {
        const {fecha} = req.params;
        const fechad = await Estado.findOne({
            where: {
                fecha
            }
        });
        await fechad.destroy();
        res.json({
            message: 'Estado deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateEstado = async (req, res) => {
    try {
        const {fecha} = req.params;
        const {cuartelID,conductividad,humedad,ph,temperatura,nitrogeno,fosforo,potasio} = req.body;
        const fechad = await Estado.findOne({
            where: {
                fecha
            }
        });
        await fechad.update({
            cuartelID,
            conductividad,
            humedad,
            ph,
            temperatura,
            nitrogeno,
            fosforo,
            potasio
        });
        res.json({
            message: 'Estado updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const getEstadoByFecha = async (req, res) => {
    try {
        const {fecha} = req.params;
        const fechad = await Estado.findOne({
            where: {
                fecha
            }
        });
        res.json(fechad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}