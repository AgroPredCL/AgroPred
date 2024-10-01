import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Uso_Fertilizante } from "./Uso_Fertilizante.js"
import { Estado } from "./Estado.js"
import { Uso_Riego } from "./Uso_Riego.js"

export const Cuartel = sequelize.define('cuartel',{
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,

    },
    area: {
        type: DataTypes.FLOAT
    },
    marco_plantacion: {
        type: DataTypes.FLOAT
    },
    cant_paltos: {
        type: DataTypes.INTEGER
    },
    tipo_planta: {
        type: DataTypes.STRING(50)
    },
    tipo_suelo: {
        type: DataTypes.STRING(50)
    },
    sistema_riego: {
        type: DataTypes.STRING(50)
    },
    caudal_sist_riego: {
        type: DataTypes.FLOAT
    },
    cant_emis_riego_planta: {
        type: DataTypes.FLOAT
    },
    nom_predio :{ 
        type: DataTypes.STRING(45)
    }

})


Cuartel.hasMany(Uso_Fertilizante,{
    foreignKey: 'cuartelID',
    sourceKey: 'id'
})

Uso_Fertilizante.belongsTo(Cuartel,{
    foreignKey: 'cuartelID',
    targetId: 'id'
})

//------------------------------------

Cuartel.hasMany(Uso_Riego,{
    foreignKey: 'cuartelID',
    sourceKey: 'id'
})

Uso_Riego.belongsTo(Cuartel,{
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

//------------------------------------

