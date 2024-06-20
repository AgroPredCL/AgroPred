import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Usuario = sequelize.define('usuario',{
    email : {
        type: DataTypes.STRING(320),
        primaryKey: true
    },
    full_name : {
        type: DataTypes.STRING(60)
    },
    password : {
        type: DataTypes.STRING(256)
    },
    num_telefono :{
        type: DataTypes.INTEGER
    },
});




