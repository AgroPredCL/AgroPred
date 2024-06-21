import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Producto = sequelize.define('producto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(25)
    },
    marca : {
        type: DataTypes.STRING(25)
    },
    cantidad : {
        type: DataTypes.INTEGER
    },
    descripcion : {
        type: DataTypes.STRING(100)
    },
    costo : {
        type: DataTypes.INTEGER
    },
    vencimiento : {
        type : DataTypes.DATE
    }
})