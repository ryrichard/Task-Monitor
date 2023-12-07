/*
Group Member
This is just to link the user with the group. 
UserID can be an array of users
GroupID should only associate with 1 group
[THIS IS NOW OBSOLETE]
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupMemberSchema = new Schema(
  {
    userID: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    groupID: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("GroupMember", groupMemberSchema);
