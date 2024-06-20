import {Project} from '../models/Project.js';



export const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const createProject = async (req, res) => {
    try {
        const {name, priority, description} = req.body;
        const newProject = await Project.create({
            name,
            priority,
            description
        })
        res.json(newProject);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findOne({
            where: {
                id
            }
        });
        await project.destroy();
        res.json({
            message: 'Project deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, priority, description} = req.body;
        const project = await Project.findOne({
            where: {
                id
            }
        });
        project.name = name;
        project.priority = priority;
        project.description = description;
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const getProjectById = async (req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findOne({
            where: {
                id
            }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}