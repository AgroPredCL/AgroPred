import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js'
import { Ubicacion } from './Ubicacion.js'
import { Usuario } from "./Usuario.js";

export const Predio = sequelize.define('predio', {
    nombre: {
        type: DataTypes.STRING(45),
        primaryKey: true
    },
    area: {
        type: DataTypes.FLOAT,
    },
})

Predio.hasOne(Ubicacion, {
    foreignKey: 'predioNombre',
    sourceKey: 'nombre'
})

Ubicacion.belongsTo(Predio, {
    foreignKey: 'predioNombre',
    targetId: 'nombre'
})

//-----------------------------------------------

Predio.hasMany(Usuario,{
    foreignKey: 'predioNombre',
    sourceKey: 'nombre'
})

Usuario.belongsTo(Predio,{
    foreignKey: 'predioNombre',
    targetId: 'nombre'
})
