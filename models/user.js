const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fileSrc: {
        type: String,
        default: ''
    }
})
module.exports = mongoose.model('user', User)
