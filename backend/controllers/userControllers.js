/**
 * User login controller
 * Functionality of processing the login request goes here
<<<<<<< HEAD
*/
const User = require('../database/models/userModel')
const Group = require('../database/models/groupModel')
const GroupMember = require('../database/models/groupMemberModel')
const Task = require('../database/models/taskModel')
const TaskGroup = require('../database/models/taskGroupModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 10

const Task = require("../database/models/taskModel");
const TaskGroup = require("../database/models/taskGroupModel");

async function getallUserController(req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    // check if user exist
    if (!user) {
      return res.status(401).json({ message: "Error: Incorrect Login" });
    }

    // Compare password with encrypted password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Error: Incorrect User" });
    }

    // Generate jwt token
    const token = jwt.sign(
      { user: user._id, username: user.username },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    //successful User
    res.json({ message: "Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * User Logout controller
 * Functionality of processing the logout request goes here
 */
async function logoutController(req, res) {
  try {
    res.clear("jwtToken");

    res.json({ message: "Logout Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * User Register Controller
 * Functionality of processing the register request goes here
 */
async function registerController(req, res) {
  const { username, password, email } = req.body;

  // console.log(`${username}, ${password}, ${email}`)

  const usernameExist = await User.exists({
    username: { $regex: new RegExp(username, "i") },
  });

  // const userE = await User.findOne({username})
  // console.log(userE)

  if (usernameExist) {
    return res.status(400).json({ message: "Username already exist" });
  }

  const emailExist = await User.exists({
    email: { $regex: new RegExp(email, "i") },
  });

  if (emailExist) {
    return res.status(400).json({ message: "Email already exist" });
  }

  try {
    // encrypt password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { username, hashedPassword, email };

    const createUser = await User.create(newUser);

    res
      .status(200)
      .json({ message: "User registration successful", user: newUser });
  } catch (err) {
    console.error("Error during registration: ", err);
  }
}

/*
Get all task
Requires user id or group id
check if id is valid 
check if any taskgroup is associated with id
return all task
*/
async function getTasksController(req, res){
     // get id
    const {id} = req.body

    try {
        // check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid ID"})
        }
        // check if there is any taskgroup associated with id
        const taskGroupExist = await TaskGroup.findOne({id: id})

        if(!taskGroupExist){
            return res.status(404).json({error: "No task associated wtih ID"})
        }

        // grab all the taskId in the taskgroud
        const taskIds = taskGroupExist.taskId

        // find all the task with the taskId
        const tasks = await Task.find({_id: {$in: taskIds}})

        // return it all
        return res.status(200).json(tasks)
    } catch (err){
        console.error(err)
    }
}

/*
Get a task
Requires userid/groupid and taskid
First look for userId/groupID in taskGroup.
Then in taskId, look for taskId
*/

async function getTaskController(req, res) {}

/*
Create task 
<<<<<<< HEAD
Requires 2 objects, the user or group and task
Steps:
    check if id is valid
    check if id exist in groupdb or userdb
    check if taskGroup is associated with id
        if yes, add task.id to taskGroup; end
        if no...
    create taskGroup
    assign userId.groupId to taskGroup
    assign taskId to taskGroup
    end
*/
async function createTaskController(req, res){
    const {id, title, description, completed} = req.body

    try{
        // check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid ID"})
        }

        // find id in User or Group db
        const exist = await User.findOne({_id: id}) || await Group.findOne({_id: id})

        //check if exist in group or user
        if(!exist){
            return res.status(500).json({message: "Invalid ID", id: id})
        }

        // create task instance
        const newTask = await Task.create({ title, description, completed, id });
        return res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//create a task group
async function createTaskGroupController(req, res) {
  const { id, taskId } = req.body;

  try {
    const newTask = await TaskGroup.create({
      id,
      taskId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete task
// Requires userid/groupid and taskid
// Find taskGroup based on userid/groupid
// Find task based on taskgroup.taskid
// Delete it if found
// */
async function deleteTaskController(req, res) {}

/*
Update task 
Requires userid/groupid and taskid
Find taskGroup based on userid/groupid
Find task based on taskgroup.taskid
Update if found
*/
async function updateTaskController(req, res) {}

module.exports = {
  getallUserController,
  loginController,
  logoutController,
  registerController,
  getTasksController,
  getTaskController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
  createTaskGroupController,
};
