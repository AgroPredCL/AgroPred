import {Task} from '../models/Task.js';



export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const createTask = async (req, res) => {
    try {
        const {name, done, projectId} = req.body;
        const newTask = await Task.create({
            name,
            done,
            projectId
        })
        res.json(newTask);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({
            where: {
                id
            }
        });
        await task.destroy();
        res.json({
            message: 'Task deleted'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, done, projectId} = req.body;
        const task = await Task.findOne({
            where: {
                id
            }
        });
        task.name = name;
        task.done = done;
        task.projectid = projectId;
        await task.save();
        res.json(task);
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({
            where: {
                id
            }
        });
        res.json(task);
    }  
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}