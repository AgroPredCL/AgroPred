import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"
import { Uso_Fertilizante } from "./Uso_Fertilizante.js"
import { Estado } from "./Estado.js"
import { Uso_Riego } from "./Uso_Riego.js"

export const Cuartel = sequelize.define('cuartel',{
    // INFORMACION DEL CUARTEL MISMO
    id: {
        type: DataTypes.STRING(20), 
        primaryKey: true,
    },
    area: {
        type: DataTypes.FLOAT
    }, 
    cant_paltos: {
        type: DataTypes.INTEGER
    },
    tipo_planta: {
        type: DataTypes.STRING(50)
    },
    // INFORMACION NECESARIA PARA ESTADO HIDRICO Y RIEGO
    factor_area_sombreada: {
        type: DataTypes.FLOAT
    },
    eficiencia_riego: {
        type: DataTypes.FLOAT
    },
    marco_plantacion: {
        type: DataTypes.FLOAT
    },
    caudal_emisor: {
        type: DataTypes.FLOAT
    },
    numero_emisores_planta: {
        type: DataTypes.INTEGER
    },
    coeficiente_uniformidad: {
        type: DataTypes.FLOAT
    },
    retencion_agua_suelo: {
        type: DataTypes.FLOAT
    },
    profundidad_raices:{
        type: DataTypes.FLOAT
    },
    umbral_riego: {
        type: DataTypes.FLOAT
    },
    porcentaje_suelo_emisores: {
        type: DataTypes.FLOAT
    },
    piedras_perfil_suelo: {
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

