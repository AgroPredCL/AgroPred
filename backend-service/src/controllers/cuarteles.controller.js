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
            id,
            area,
            marco_plantacion,
            cant_paltos,
            tipo_planta,
            factor_area_sombreada, 
            eficiencia_riego, 
            caudal_emisor, 
            numero_emisores_planta, 
            coeficiente_uniformidad, 
            retencion_agua_suelo,
            profundidad_raices, 
            umbral_riego, 
            porcentaje_suelo_emisores, 
            piedras_perfil_suelo,
            nom_predio
        } = req.body;

        const newCuartel = await Cuartel.create({
            id,
            area,
            marco_plantacion,
            cant_paltos,
            tipo_planta,
            factor_area_sombreada, 
            eficiencia_riego, 
            caudal_emisor, 
            numero_emisores_planta, 
            coeficiente_uniformidad, 
            retencion_agua_suelo, 
            profundidad_raices, 
            umbral_riego, 
            porcentaje_suelo_emisores, 
            piedras_perfil_suelo, 
            nom_predio
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
        const { id } = req.params;
        const cuartel = await Cuartel.findOne({ where: { id } });

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
        const { id } = req.params;
        const {
            area,
            marco_plantacion,
            cant_paltos,
            tipo_planta,
            factor_area_sombreada, // Añadido
            eficiencia_riego, // Añadido
            caudal_emisor, // Añadido
            numero_emisores_planta, // Añadido
            coeficiente_uniformidad, // Añadido
            retencion_agua_suelo, // Añadido
            profundidad_raices, // Añadido
            umbral_riego, // Añadido
            porcentaje_suelo_emisores, // Añadido
            piedras_perfil_suelo, // Añadido
            nom_predio
        } = req.body;

        const cuartel = await Cuartel.findOne({ where: { id } });

        if (!cuartel) {
            return res.status(404).json({ message: 'Cuartel not found' });
        }

        // Crear un objeto con los atributos actualizables
        const updateData = {};

        if (area !== undefined) updateData.area = area;
        if (marco_plantacion !== undefined) updateData.marco_plantacion = marco_plantacion;
        if (cant_paltos !== undefined) updateData.cant_paltos = cant_paltos;
        if (tipo_planta !== undefined) updateData.tipo_planta = tipo_planta;
        if (factor_area_sombreada !== undefined) updateData.factor_area_sombreada = factor_area_sombreada; // Añadido
        if (eficiencia_riego !== undefined) updateData.eficiencia_riego = eficiencia_riego; // Añadido
        if (caudal_emisor !== undefined) updateData.caudal_emisor = caudal_emisor; // Añadido
        if (numero_emisores_planta !== undefined) updateData.numero_emisores_planta = numero_emisores_planta; // Añadido
        if (coeficiente_uniformidad !== undefined) updateData.coeficiente_uniformidad = coeficiente_uniformidad; // Añadido
        if (retencion_agua_suelo !== undefined) updateData.retencion_agua_suelo = retencion_agua_suelo; // Añadido
        if (profundidad_raices !== undefined) updateData.profundidad_raices = profundidad_raices; // Añadido
        if (umbral_riego !== undefined) updateData.umbral_riego = umbral_riego; // Añadido
        if (porcentaje_suelo_emisores !== undefined) updateData.porcentaje_suelo_emisores = porcentaje_suelo_emisores; // Añadido
        if (piedras_perfil_suelo !== undefined) updateData.piedras_perfil_suelo = piedras_perfil_suelo; // Añadido
        if (nom_predio !== undefined) updateData.nom_predio = nom_predio;

        // Actualizar solo los campos proporcionados
        await cuartel.update(updateData);

        res.json({ message: 'Cuartel updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const getCuartelById = async (req, res) => {
    try {
        const { id } = req.params;
        const cuartel = await Cuartel.findOne({ where: { id } });

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
