import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"

export const Estado_Enfermedad = sequelize.define('estado_enfermedad',{
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nom_enfermedad: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    }
})
