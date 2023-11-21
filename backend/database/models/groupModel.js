/*
Group model
A name is required as well as make it unique. 
userID is also required, as a group needs members, otherwise should be deleted
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    groupLeaderID:{
        type: [mongoose.Types.ObjectId],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Group', groupSchema)
