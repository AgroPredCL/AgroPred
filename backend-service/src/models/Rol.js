import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js';
import { Rol_Usuario } from "./Rol_Usuario.js";


export const Rol = sequelize.define('rol',{
    rol_user: {
        type: DataTypes.STRING(20),
        primaryKey: true
    },
})

Rol.hasMany(Rol_Usuario, {
    foreignKey:'rol_user',
    sourceKey: 'rol_user'
})

Rol_Usuario.belongsTo(Rol, {
    foreignKey: 'rol_user',
    targetId: 'rol_user'
})
