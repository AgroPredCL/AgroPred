import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Estado_Enfermedad } from "./Estado_Enfermedad.js"

export const Estado = sequelize.define('estado',{
    fecha: {
        type:DataTypes.DATE,
        primaryKey: true,
        allowNull: false
    },
    cuartel_ID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    conductividad:{
        type: DataTypes.FLOAT
    },
    fosforo : {
        type: DataTypes.FLOAT
    },
    humedad: { 
        type: DataTypes.FLOAT
    },
    nitrogeno : {
        type: DataTypes.FLOAT
    },
    ph: {
        type: DataTypes.FLOAT
    },
    potasio : {
        type: DataTypes.FLOAT
    },
    temperatura:{
        type: DataTypes.FLOAT
    }

})

Estado.hasMany(Estado_Enfermedad,{
    foreignKey: 'fecha_estado',
    sourceKey: 'fecha'
})

Estado_Enfermedad.belongsTo(Estado,{
    foreignKey: 'fecha_estado',
    targetId: 'fecha'
})