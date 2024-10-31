import { Cuartel } from "../models/Cuartel.js";

export const getCuarteles = async (req, res) => {
    try {
        const cuarteles = await Cuartel.findAll();
        res.json(cuarteles);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const createCuartel = async (req, res) => {
    try {
        const {
            nombre_Cuartel,
            nom_predio,
            area,
            cant_paltos,
            caudal_emisor, 
            coeficiente_uniformidad,
            eficiencia_riego,
            factor_area_sombreada, 
            marco_plantacion,
            numero_emisores_planta,
            piedras_perfil_suelo,
            porcentaje_suelo_emisores, 
            profundidad_raices,
            retencion_agua_suelo,
            tipo_planta,
            umbral_riego
       
        } = req.body;

        const newCuartel = await Cuartel.create({
            nombre_Cuartel,
            nom_predio,
            area,
            cant_paltos,
            caudal_emisor, 
            coeficiente_uniformidad,
            eficiencia_riego,
            factor_area_sombreada, 
            marco_plantacion,
            numero_emisores_planta,
            piedras_perfil_suelo,
            porcentaje_suelo_emisores, 
            profundidad_raices,
            retencion_agua_suelo,
            tipo_planta,
            umbral_riego
        });
        res.status(201).json(newCuartel);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const deleteCuartel = async (req, res) => {
    try {
        const { nombre_Cuartel } = req.params;
        const cuartel = await Cuartel.findOne({ where: { nombre_Cuartel } });

        if (!cuartel) {
            return res.status(404).json({ message: 'Cuartel not found' });
        }

        await cuartel.destroy();
        res.json({ message: 'Cuartel deleted' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const updateCuartel = async (req, res) => {
    try {
        const { nombre_Cuartel } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const cuartel = await Cuartel.findOne({ where: { nombre_Cuartel } });

        if (!cuartel) {
            return res.status(404).json({ message: 'Cuartel not found' });
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
        await cuartel.update(filteredData);

        res.json({ message: 'Cuartel updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const getCuartelByNombre = async (req, res) => {
    try {
        const { nombre_Cuartel } = req.params;
        const cuartel = await Cuartel.findOne({ where: { nombre_Cuartel } });

        if (!cuartel) {
            return res.status(404).json({ message: 'Cuartel not found' });
        }

        res.json(cuartel);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};
