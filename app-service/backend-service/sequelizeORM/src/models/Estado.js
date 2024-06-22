import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Recomendacion } from "./Recomendacion.js"
import { Estado_Enfermedad } from "./Estado_Enfermedad.js"

export const Estado = sequelize.define('estado',{
    fecha: {
        type:DataTypes.DATE,
        primaryKey: true
    },
    cuartelID: {
        type: DataTypes.STRING(5),
        primaryKey: true
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

Estado.hasOne(Recomendacion,{
    foreignKey: 'EstadoID',
    sourceKey: 'cuartelID'
})

Recomendacion.belongsTo(Estado,{
    foreignKey: 'EstadoID',
    targetId: 'cuartelID'
})
//---------------------------------

Estado.hasMany(Estado_Enfermedad,{
    foreignKey: 'fecha_estado',
    sourceKey: 'fecha'
})

Estado_Enfermedad.belongsTo(Estado,{
    foreignKey: 'fecha_estado',
    targetId: 'fecha'
})