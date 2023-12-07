/*
Simple user login info. Just takes a required username and password.]
Username would have to be unique
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    hashedPassword:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)