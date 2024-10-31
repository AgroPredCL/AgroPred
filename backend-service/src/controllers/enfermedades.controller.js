import { Enfermedad } from "../models/Enfermedad.js";

export const getEnfermedades = async (req, res) => {
    try {
        const enfermedades  = await Enfermedad.findAll();
        res.json(enfermedades);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createEnfermedad = async (req, res) => {
    try {
        const {nombre,descripcion} = req.body;
        const newEnfermedad = await Enfermedad.create({
            nombre,
            descripcion
            
        })
        res.json(newEnfermedad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteEnfermedad = async (req, res) => {
    try {
        const {nombre} = req.params;
        const enfermedad = await Enfermedad.findOne({
            where: {
                nombre
            }
        });
        await enfermedad.destroy();
        res.json({
            message: 'Enfermedad deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateEnfermedad = async (req, res) => {
    try {
        const { nombre } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const enfermedad = await Enfermedad.findOne({ where: { nombre } });

        if (!enfermedad) {
            return res.status(404).json({ message: 'Enfermedad not found' });
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
        await enfermedad.update(filteredData);

        res.json({ message: 'Enfermedad updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};


export const getEnfermedadByNombre = async (req, res) => {
    try {
        const {nombre} = req.params;
        const enfermedad = await Enfermedad.findOne({
            where: {
                nombre
            }
        });
        res.json(enfermedad);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}