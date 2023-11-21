/*
Task Schema
Requires a title and completed. Obviously a title is nessecary. Completed is also required.
Description is not necessary as the title sometimes explains enough
Description is optional
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    completed:{
        type: Boolean,
        default: false,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)