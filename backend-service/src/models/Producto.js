import { DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"

export const Producto = sequelize.define('producto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria : {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cantidad : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion : {
        type: DataTypes.STRING(100)
    },
    estado : {
        type: DataTypes.STRING(100)
    },
    nombre:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(40)
    }
   
    
  

 
    
    
}) 