import {Ubicacion} from '../models/Ubicacion.js';


export const getUbicaciones = async (req, res) => {
    try {
        const ubicaciones = await Ubicacion.findAll();
        res.json(ubicaciones);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createUbicacion = async (req, res) => {
    try {
        const {nom_predio,calle,codigo_Postal,comuna,numero,region} = req.body;
        const newUbicacion = await Ubicacion.create({
            nom_predio,
            calle,
            codigo_Postal,
            comuna,
            numero,
            region
        })
        res.json(newUbicacion);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
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
            data: {error}
        });
    }
}

export const updateUbicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const ubicacion = await Ubicacion.findOne({ where: { id } });

        if (!ubicacion) {
            return res.status(404).json({ message: 'Ubicacion not found' });
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
        await ubicacion.update(filteredData);

        res.json({ message: 'Ubicacion updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: { error }
        });
    }
};

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
            data: {error}
        });
    }
}