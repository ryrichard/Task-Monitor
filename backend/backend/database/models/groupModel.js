/*
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    userID:{
        type : [mongoose.Types.ObjectId],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.models('Group', groupSchema)