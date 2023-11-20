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
        type: string,
        required: true
    },
    description:{
        type: string,
    },
    completed:{
        type: boolean,
        default: false,
        required: true
    },
    id:{
        type:[mongoose.Types.ObjectId],
        required:true
    }

}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)