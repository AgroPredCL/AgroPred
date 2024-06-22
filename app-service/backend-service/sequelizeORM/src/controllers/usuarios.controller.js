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
        const {email,full_name,password,num_telefono,nom_predio} = req.body;
        const newUsuario = await Usuario.create({
            email,
            full_name,
            password,
            num_telefono,
            nom_predio
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
        const {email} = req.params;
        const {full_name,password,num_telefono,nom_predio} = req.body;
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        await usuario.update({
            full_name,
            password,
            num_telefono,
            nom_predio
        });
        res.json({
            message: 'Usuario updated'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {error}
        });
    }
}

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