/*
Task Group 
This is just to link the user or group with task. 
Id can only be either 1 user or 1 group
TaskId can be an array
[THIS IS NOW OBSOLETE]
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskGroupSchema = new Schema({
    id:{
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    taskId: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("TaskGroup", taskGroupSchema);
