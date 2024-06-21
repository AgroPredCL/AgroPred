import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


export const Cuartel = sequelize.define('cuartel',{
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        autoIncrement: true
    },
    area: {
        type: DataTypes.FLOAT
    },
    descripcion: {
        type: DataTypes.STRING(400)
    },
    cant_paltos: {
        type: DataTypes.INTEGER
    },

})