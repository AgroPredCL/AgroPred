import { DATE, DataTypes } from "sequelize"
import  sequelize  from "../database/database.js"
import { Producto} from "./Producto.js"
import { Contratista} from "./Contratista.js"

export const Inventario = sequelize.define('inventario',{
    categoria : {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    },
    nom_predio : {
        type: DataTypes.STRING(45),
        allowNull: false
    }
})

Inventario.hasMany(Producto,{
    foreignKey: 'categoria',
    sourceKey: 'categoria'
})

Producto.belongsTo(Inventario,{
    foreignKey: 'categoria',
    targetId:'categoria'
})

//-----------------------------------

Inventario.hasMany(Contratista,{
    foreignKey: 'categoria',
    sourceKey: 'categoria'
})

Contratista.belongsTo(Inventario,{
    foreignKey: 'categoria',
    targetId: 'categoria'
})