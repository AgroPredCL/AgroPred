import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Estado = sequelize.define('estado',{
    fecha: {
        type:DataTypes.DATE,
        primaryKey: true
    },
    cuartelID: {
        type: DataTypes.STRING(5)
    },
    conductividad:{
        type: DataTypes.FLOAT
    },
    humedad: {
        type: DataTypes.FLOAT
    },
    ph: {
        type: DataTypes.FLOAT
    },
    temperatura:{
        type: DataTypes.FLOAT
    },
    nitrogeno : {
        type: DataTypes.FLOAT
    },
    fosforo : {
        type: DataTypes.FLOAT
    },
    potasio : {
        type: DataTypes.FLOAT
    }
})