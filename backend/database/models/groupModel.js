/*
Group model
A name is required as well as make it unique. 
There are two types of members: leader and regular member. 
Leader only has 1 element
Member can be an array
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    groupLeaderID:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    groupMemberID:{
      type: [mongoose.Types.ObjectId],
      required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Group', groupSchema)
