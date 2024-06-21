import { DATE, DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Inventario = sequelize.define('inventario',{
    categoria : {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    nom_predio : {
        type: DataTypes.STRING(45)
    }
})