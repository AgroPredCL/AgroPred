import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Rol_Usuario } from "./Rol_Usuario.js";
import { Rol } from "./Rol.js";

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
    nom_predio :{
        type: DataTypes.STRING(45)
    }
})



Usuario.hasMany(Rol_Usuario,{
    foreignKey: 'email',
    sourceKey: 'email'
})

Rol_Usuario.belongsTo(Usuario,{
    foreignKey: 'email',
    targetId: 'email'
})


