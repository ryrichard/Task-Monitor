const express = require("express");
const {
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
} = require("../controllers/userControllers");

const router = express.Router();

// router.get("/", () => {console.log("TestingTesting123")})

//Get all users
router.get("/user/all", getallUserController);

//Post login
router.post("/user/login", loginController);

//Post logout
router.post("/user/logout", logoutController);

//Post register
router.post("/user/register", registerController);

//GET all Task
router.get("/task", getTasksController);

//GET 1 Task
router.get("/task/:id", getTaskController);

//POST a new task
router.post("/task", createTaskController);

//DELETE a task
router.delete("/task/:id", deleteTaskController);

//PATCH a task
router.patch("/task/:id", updateTaskController);

//POST new group
router.post("/group/create", createGroupController);

//GET all groups
router.get("/groups", getGroupsController);

module.exports = router;
