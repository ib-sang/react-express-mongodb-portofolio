// Dependencies
const mongoose = require('mongoose');
const c = require('./../../config/constants');

const Schema = mongoose.Schema;

const usersSchema = Schema({

    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        trim: true,
        default: ''
    },
    username:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        require: true
    },
    password: {
        type: String,
        trim: true,
        require: true
    },
    imageUser:{
        type: String,
        trim: true
    },
    roles: {
        type: [
            {
                type: String,
                'enum': [
                    c.ROLE_ADMIN,
                    c.ROLE_USER,
                    c.ROLE_GEST
                ]
            }
        ],
        default: [c.ROLE_USER]
    }


})

module.exports = mongoose.model('users', usersSchema);