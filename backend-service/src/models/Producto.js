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
    vencimiento : {
        type : DataTypes.DATE,
        allowNull: false
    },
    cantidad : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    costo : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion : {
        type: DataTypes.STRING(100)
    },
    marca : {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING(25),
        allowNull: false
    }
   
    
  

 
    
    
}) 