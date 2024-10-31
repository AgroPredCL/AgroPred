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
        const {fecha,cuartel_ID,conductividad,fosforo,humedad,nitrogeno,ph,potasio,temperatura} = req.body;
        const newEstado = await Estado.create({
            fecha,
            cuartel_ID,
            conductividad,
            fosforo,
            humedad,
            nitrogeno,
            ph,
            potasio,
            temperatura  
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
        const { fecha } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const fechad = await Estado.findOne({ where: { fecha } });

        if (!fechad) {
            return res.status(404).json({ message: 'Estado not found' });
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
        await fechad.update(filteredData);

        res.json({ message: 'Estado updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

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