const express = require('express')
const {
    getallUserController,
    loginController,
    logoutController,
    registerController,
    getTasksController,
    getTaskController,
    createTaskController,
    deleteTaskController,
    updateTaskController
} = require('../controllers/userControllers')

const router = express.Router()

//Get all users
router.get('/user/all', getallUserController)

//Post login
router.post('/user/login', loginController)

//Post logout
router.post('/user/logout', logoutController)

//Post register
router.post('/user/register', registerController)

//GET all Task
router.get('/task', getTasksController)

//GET 1 Task
router.get('/task/:id', getTaskController)

//POST a new task
router.post('/task', createTaskController)

//DELETE a task
router.delete('/task/:id', deleteTaskController)

//PATCH a task
router.patch('/task/:id', updateTaskController)

module.exports = router
