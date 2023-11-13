/*
Simple user login info. Just takes a required username and password.]
Username would have to be unique
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)