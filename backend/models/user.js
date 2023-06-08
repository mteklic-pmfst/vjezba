const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: Date,
        required: true,
        unique: true
    },    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},

{
    timestamps: true
}
)

const userModel = mongoose.model('users', userSchema)
module.exports = userModel;