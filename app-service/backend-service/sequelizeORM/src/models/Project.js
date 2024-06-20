import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js'
import { Task } from './Task.js'

export const Project = sequelize.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
    },
    priority: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING(255),
    },
})

Project.hasMany(Task, {
    // Defined by me (atribute on Task table)
    foreignKey: 'projectId',
    // Defined by me (atribute on Project table)
    sourceKey: 'id'
});

Task.belongsTo(Project, {
    foreignKey: 'projectId',
    targetId: 'id'
})