import { Uso_Fertilizante } from "../models/Uso_Fertilizante.js";


export const getUsos_Fertilizantes = async (req, res) => {
    try {
        const usos_fertilizantes  = await Uso_Fertilizante.findAll();
        res.json(usos_fertilizantes);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const createUso_Fertilizante= async (req, res) => {
    try {
        const {cuartel_ID,fecha,hora,observacion,tipo} = req.body;
        const newUso_Fertilizante= await Uso_Fertilizante.create({
            cuartel_ID,
            fecha,
            hora,
            observacion,
            tipo
            
        })
        res.json(newUso_Fertilizante);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteUso_Fertilizante = async (req, res) => {
    try {
        const {id} = req.params;
        const Uso_Fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });
        await Uso_Fertilizante.destroy();
        res.json({
            message: 'Uso-fertilizante deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const updateUso_Fertilizante = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const uso_Fertilizante = await Uso_Fertilizante.findOne({ where: { id } });

        if (!uso_Fertilizante) {
            return res.status(404).json({ message: 'Uso_Fertilizante not found' });
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
        await uso_Fertilizante.update(filteredData);

        res.json({ message: 'Uso_Fertilizante updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};


export const getUso_FertilizanteById = async (req, res) => {
    try {
        const {id} = req.params;
        const Uso_Fertilizante = await Uso_Fertilizante.findOne({
            where: {
                id
            }
        });
        res.json(Uso_Fertilizante);
    } catch (error) {
        res.status(500).json({ 
            message: 'Something went wrong',
            data: {error}
        });
    }
}