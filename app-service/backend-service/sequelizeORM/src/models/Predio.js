import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js'
import { Ubicacion } from './Ubicacion.js'

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
    sourceKey: 'nombre'
})
