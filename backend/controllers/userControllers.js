/**
 * User login controller 
 * Functionality of processing the login request goes here
*/
const User = require('../database/models/userModel')
const bcrypt = require('bcrypt')

async function loginController(req, res) {
    const { username, password } = req.body;

    try{
        const user = await (User.findOne({username}))
        // check if user exist
        if(!user){
            return res.status(401).json({message: "Error: Incorrect Login"})
        }

        // Compare password with encrypted password
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)

        // check if password is correct with associated user. Right now jsut checking strings
        // const isPasswordValid = await password === user.password

        if(!isPasswordValid){
            return res.status(401).json({message: "Error: Incorrect User"})
        }
        //successful User
        req.session.user = {id: user._id, username: user.username};
        res.json({message: 'User Successful', user: req.session.user})
    } catch (error){
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

/**
 * User Logout controller
 * Functionality of processing the logout request goes here
 */
async function logoutController(req, res) {
    req.session.destroy((err) => {
        if(err){
            console.error(err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        res.json({message: "Logout Successful"})
    })
}

/**
 * User Register Controller
 * Functionality of processing the register request goes here
 */
async function registerController(req, res) {
    const {username, password, email } = req.body

    if(User.some((user) => user.username == username)) {
        return res.status(400).json({message: "Username already exist"})
    }

    if(User.some((email) => user.email == email)) {
        return res.status(400).json({message: "Email already exist"})
    }

    try{
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, process.env.SALTROUNDS)

        const newUser = {username, hashedPassword, email};
        User.push(newUser);

        res.json({message: "User registration successful", user: newUser})
    } catch (err) {
        console.error("Error during registration: ", err);
    }
}

/**
 * Upvote fact controller
 * Functionality of a user clicking the upvote fact goes here
 */
async function upvoteFactController(req, res) {

}

/**
 * Downvote fact controller 
 * Functionality of a user clicking the downvote fact goes here
 */
async function downvoteFactController(req, res) {

}

/**
 * Upvote comment controller 
 * Functionality of a user clicking the upvote a comment goes here
 */
async function upvoteCommentController(req, res) {

}

/**
 * Downvote comment controller 
 * Functionality of a user clicking the downvote a comment goes here
 */
async function downvoteCommentController(req, res) {

}

/**
 * Post comment controller 
 * Functionality of a user post a comment to a fact goes here
 */
async function postCommentController(req, res) {

}


module.exports = {
    loginController,
    logoutController,
    registerController,
    upvoteFactController,
    upvoteCommentController,
    downvoteFactController,
    downvoteCommentController,
    postCommentController,
}