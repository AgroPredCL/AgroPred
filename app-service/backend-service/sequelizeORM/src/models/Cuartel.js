import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Uso_Recurso } from "./Uso_Recurso.js"
import { Estado } from "./Estado.js"

export const Cuartel = sequelize.define('cuartel',{
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,

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
    nom_predio :{ 
        type: DataTypes.STRING(45)
    }

})


Cuartel.hasMany(Uso_Recurso,{
    foreignKey: 'cuartelID',
    sourceKey: 'id'
})

Uso_Recurso.belongsTo(Cuartel,{
    foreignKey: 'cuartelID',
    targetId: 'id'
})

//------------------------------------

Cuartel.hasMany(Estado,{
    foreignKey: 'cuartelID',
    sourceKey: 'id'
})

Estado.belongsTo(Cuartel,{
    foreignKey: 'cuartelID',
    targetId: 'id'
})