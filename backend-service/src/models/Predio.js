import { DataTypes } from "sequelize";
import  sequelize  from '../database/database.js'
import { Ubicacion } from './Ubicacion.js'
import { Usuario } from "./Usuario.js";
import { Cuartel } from "./Cuartel.js";
import {Inventario} from "./Inventario.js";
import { Contratista } from "./Contratista.js";

export const Predio = sequelize.define('predio', {
    nombre: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    area: {
        type: DataTypes.FLOAT,
    },
})

Predio.hasOne(Ubicacion, {
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})

Ubicacion.belongsTo(Predio, {
    foreignKey: 'nom_predio',
    targetId: 'nombre'
})

//-----------------------------------------------


Predio.hasMany(Usuario,{
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})

Usuario.belongsTo(Predio,{
    foreignKey: 'nom_predio',
    targetId: 'nombre'
})

//------------------------------------------------

Predio.hasMany(Inventario,{
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})

Inventario.belongsTo(Predio,{
    foreignKey: 'nom_predio',
    targetId: 'nombre'
})

//-------------------------------------------------



Predio.hasMany(Cuartel,{
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})

Cuartel.belongsTo(Predio,{
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})

//----------------------------------------------------

Predio.hasMany(Contratista,{
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})

Contratista.belongsTo(Predio,{
    foreignKey: 'nom_predio',
    sourceKey: 'nombre'
})