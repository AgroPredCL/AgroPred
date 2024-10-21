import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Estado_Enfermedad } from "./Estado_Enfermedad.js"

export const Estado = sequelize.define('estado',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cuartel_ID: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME, 
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
    foreignKey: 'id_estado',
    sourceKey: 'id'
})

Estado_Enfermedad.belongsTo(Estado,{
    foreignKey: 'id_estado',
    targetId: 'id'
})