import {Ubicacion} from '../models/Ubicacion.js';


export const getUbicaciones = async (req, res) => {
    try {
        const ubicaciones = await Ubicacion.findAll();
        res.json(ubicaciones);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const createUbicacion = async (req, res) => {
    try {
        const {region, comuna, calle, numero, codigoPostal, predioNombre} = req.body;
        const newUbicacion = await Ubicacion.create({
            region,
            comuna,
            calle,
            numero,
            codigoPostal,
            predioNombre
        })
        res.json(newUbicacion);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const deleteUbicacion = async (req, res) => {
    try {
        const {id} = req.params;
        const ubicacion = await Ubicacion.findOne({
            where: {
                id
            }
        });
        await ubicacion.destroy();
        res.json({
            message: 'Ubicacion deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updateUbicacion = async (req, res) => {
    try {
        const {id} = req.params;
        const {region, comuna, calle, numero, codigoPostal} = req.body;
        const ubicacion = await Ubicacion.findOne({
            where: {
                id
            }
        });
        await ubicacion.update({
            region,
            comuna,
            calle,
            numero,
            codigoPostal
        });
        res.json({
            message: 'Ubicacion updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const getUbicacionById = async (req, res) => {
    try {
        const {id} = req.params;
        const ubicacion = await Ubicacion.findOne({
            where: {
                id
            }
        });
        res.json(ubicacion);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}