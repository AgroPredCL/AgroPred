import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Cuartel } from "./Cuartel.js"

export const Uso_Fertilizante = sequelize.define('uso_fertilizante',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    observacion: {
        type: DataTypes.STRING(400)
    },
    tipo: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
   
})