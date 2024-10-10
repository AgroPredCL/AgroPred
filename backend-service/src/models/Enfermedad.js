import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Estado_Enfermedad } from "./Estado_Enfermedad.js"

export const Enfermedad = sequelize.define('enfermedad',{
    nombre : {
        type:DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    },
    descripcion : {
        type: DataTypes.STRING(200),
        allowNull: false
    }
})

Enfermedad.hasMany(Estado_Enfermedad,{
    foreignKey: 'nom_enfermedad',
    sourceKey: 'nombre'
})

Estado_Enfermedad.belongsTo(Enfermedad,{
    foreignKey: 'nom_enfermedad',
    targetId:'nombre'
})