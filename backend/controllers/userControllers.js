/**
 * User login controller
 * Functionality of processing the login request goes here
<<<<<<< HEAD
*/
const User = require("../database/models/userModel");
const Group = require("../database/models/groupModel");
const Task = require("../database/models/taskModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const createToken = (_id) => {
  //(payload, secret, options)
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {});
};

// USER
async function getallUserController(req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    // Check if username and password are provided
    if (!username || !password) {
      return res.json({
        status: "FAILED",
        message: "Username and password are required",
      });
    }

    // Find the user in the database
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(500).json({
        status: "FAILED",
        message: "Can't find username",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(500).json({
        status: "FAILED",
        message: "Invalid username or password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your-secret-key", // Replace with your secret key for signing the token
      { expiresIn: "1h" } // Token expires in 1 hour (adjust as needed)
    );

    // Respond with the token
    res.json({
      status: "SUCCESS",
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
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

  try {
    // Check if username and password are provided
    if (!username || !password) {
      return res.json({
        status: "FAILED",
        message: "Username and password are required",
      });
    }

    // Check if username is valid
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)) {
      return res.status(500).json({
        status: "FAILED",
        message: "Invalid username format （NO !@#$%...)",
      });
    }

    // Check if password meets minimum length requirement
    if (password.length < 4) {
      return res.status(500).json({
        status: "FAILED",
        message: "Password is too short (minimum length: 4 characters)",
      });
    }

    // Check if the username already exists
    const usernameExists = await User.exists({ username: username });
    if (usernameExists) {
      return res.status(500).json({
        status: "FAILED",
        message: "Username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user
    const newUser = await User.create({
      username: username,
      hashedPassword: hashedPassword,
      email: email,
    });

    // You can choose to respond with the created user details or a success message
    return res.json({
      status: "SUCCESS",
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
}

// TASK

/*
Get all task
Requires user id or group id
check if id is valid 
check if any taskgroup is associated with id
return all task
*/
async function getTasksController(req, res) {}

/*
Get a task
Requires userid/groupid and taskid
First look for userId/groupID in taskGroup.
Then in taskId, look for taskId
*/

async function getTaskController(req, res) {
  const { userorgroupId, taskId } = req.body;

  try {
    // Validate user/group ID and task ID
    if (
      !mongoose.Types.ObjectId.isValid(userorgroupId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    // Check if the task exists and is associated with the provided user/group ID
    const task = await Task.findOne({
      _id: taskId,
      id: { $in: [userorgroupId] },
    });

    // If task not found or not associated with the provided user/group ID
    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found for the given user/group" });
    }

    // Return the task
    res.status(200).json({ task });
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/*
Create task 
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
async function createTaskController(req, res) {
  const { id, title, description, completed } = req.body;

  try {
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    // find id in User or Group db
    const exist =
      (await User.findOne({ _id: id })) || (await Group.findOne({ _id: id }));

    //check if exist in group or user
    if (!exist) {
      return res.status(500).json({ message: "Invalid ID", id: id });
    }

    // create task instance
    const newTask = await Task.create({ title, description, completed, id });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete task
// Requires userid/groupid and taskid
// Find taskGroup based on userid/groupid
// Find task based on taskgroup.taskid
// Delete it if found
// */
async function deleteTaskController(req, res) {
  const { userorgroupId, taskId } = req.body;

  try {
    // Validate user/group ID and task ID
    if (
      !mongoose.Types.ObjectId.isValid(userorgroupId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    // Check if the task exists and is associated with the provided user/group ID
    const task = await Task.findOne({
      _id: taskId,
      id: { $in: [userorgroupId] },
    });

    // If task not found or not associated with the provided user/group ID
    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found for the given user/group" });
    }

    // Delete the task
    await Task.deleteOne({ _id: taskId });

    // Return success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/*
Update task 
Requires userid/groupid and taskid
Find taskGroup based on userid/groupid
Find task based on taskgroup.taskid
Update if found
*/
async function updateTaskController(req, res) {}

// GROUP

/*
Create Group Function
Requires: User Id, Group name
Steps:
Validate id
Make sure Group name doesnt already exist in GroupDb
Create group and assign Id to leader
*/
async function createGroupController(req, res) {
  const { userId, groupName } = req.body;
  console.log(userId, groupName);
  try {
    // validate id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    // make sure group name doesnt already exist
    const groupNameExist = await Group.findOne({ name: groupName });

    if (groupNameExist) {
      return res.status(400).json({ error: "Group Name already exist" });
    }

    const newGroup = await Group.create({
      name: groupName,
      groupLeaderID: userId,
    });

    return res
      .status(200)
      .json({ message: "Group successfully created", group: newGroup });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

/*
Search Groups
Requires: none
Steps:
Gather GroupDb
Return Array of Groups
*/
async function getGroupsController(req, res) {
  try {
    const groups = await Group.find({});

    return res.status(200).json({ groups });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

/*
Search for 1 group
Requires: Group Name
Steps:
Search through GroupDb for name
Return 1 object
*/
async function getGroupByNameController(req, res) {
  const { groupName } = req.body;

  try {
    // find group
    const groupExist = await Group.findOne({ name: groupName });

    // check if exist
    if (!groupExist) {
      return res.status(404).json({ message: "Group does not exist" });
    }

    // return group
    return res.status(200).json({ groupExist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

/*
Add to Group
Requires: Username, Groupname
Steps:
Search through UserDB valid User
Search through GroupDB for valid Group
Make sure User is not in group already
Add User to group
*/
async function addToGroupController(req, res) {}

/*
Remove from Group
Requires: Username, Groupname
Steps:
Search through UserDB valid User
Search through GroupDB for valid Group
If User is leader, randomly pick a member to to be leader
If there are no members, delete group
Remove user from group if found
*/
async function removeFromGroupController(req, res) {}

/*
Delete Group
Requires: Username, Groupname
Steps:
Search through UserDB valid User
Search through GroupDB for valid Group
Check to see if User is leader of group
If so, delete group
*/
async function deleteGroupController(req, res) {}

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
  createGroupController,
  getGroupsController,
  getGroupByNameController,
};
