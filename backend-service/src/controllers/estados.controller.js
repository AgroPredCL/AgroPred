import { Estado } from "../models/Estado.js";
import moment from 'moment';

export const getEstados = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        
        // Formatear las fechas al formato DD-MM-YYYY
        const formattedEstados = estados.map(estado => {
            return {
                ...estado.toJSON(),
                fecha: moment(estado.fecha).format('DD-MM-YYYY')
            };
        });

        res.json(formattedEstados);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
}

export const createEstado= async (req, res) => {
    try {
        const {fecha,hora,cuartel_ID,conductividad,fosforo,humedad,nitrogeno,ph,potasio,temperatura} = req.body;

        const formattedFecha = moment(fecha, 'DD-MM-YYYY').format('YYYY-MM-DD');

        const newEstado = await Estado.create({
            cuartel_ID,
            fecha: formattedFecha,
            hora,
            conductividad,
            fosforo,
            humedad,
            nitrogeno,
            ph,
            potasio,
            temperatura  
        });

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
        const {id,cuartel_ID} = req.params;
        const estadoDelete = await Estado.findOne({
            where: {
                id,
                cuartel_ID
            }
        });
        await estadoDelete.destroy();
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
        const { id,cuartel_ID } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar
     
        const actualizar = await Estado.findOne({ where: { id,cuartel_ID } });

        if (!actualizar) {
            return res.status(404).json({ message: 'Estado not found' });
        }

        // Filtrar el objeto para eliminar cualquier campo que tenga un valor indefinido
        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([key, value]) => value !== undefined)
        );

        if (filteredData.fecha) {
            filteredData.fecha = moment(filteredData.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }


        // Si no hay campos válidos para actualizar, enviar error
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Actualizar solo los campos proporcionados
        await actualizar.update(filteredData);

        res.json({ message: 'Estado updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const getEstadoById = async (req, res) => {
    try {
        const { id, cuartel_ID} = req.params;
     
        // Buscar el estado por la fecha formateada
        const estado = await Estado.findOne({
            where: {
                id,
                cuartel_ID
            }
        });

        if (estado) {
            // Formatear la fecha de vuelta a DD-MM-YYYY para la respuesta
            const formattedEstado = {
                ...estado.toJSON(),
                fecha: moment(estado.fecha).format('DD-MM-YYYY')
            };

            res.json(formattedEstado);
        } else {
            res.status(404).json({
                message: 'Estado not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
}
