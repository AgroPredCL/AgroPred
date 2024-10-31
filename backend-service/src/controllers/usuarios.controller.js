import { Usuario } from "../models/Usuario.js";

export const getUsuarios =  async (req, res) => {
    try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
    } catch (error) {
    res.status(500).json({
        message: 'Something went wrong',
        data: {error}
    });
    }
}

export const createUsuario = async (req, res) => {
    try {
        const {email,nom_predio,full_name,num_telefono,password} = req.body;
        const newUsuario = await Usuario.create({
            email,
            nom_predio,
            full_name,
            num_telefono,
            password
        })
        res.json(newUsuario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const {email} = req.params;
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        await usuario.destroy();
        res.json({
            message: 'Usuario deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}



export const updateUsuario = async (req, res) => {
    try {
        const { email } = req.params;
        const updateData = req.body; // Tomamos directamente el body con los campos a actualizar

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
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
        await usuario.update(filteredData);

        res.json({ message: 'Cuartel updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: { error }
        });
    }
};

export const getUsuarioByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
} 