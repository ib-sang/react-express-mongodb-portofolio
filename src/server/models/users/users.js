// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const c = require('./../../config/constants');
const config =require('./../../config')
const salt=10;

const Schema = mongoose.Schema;

const usersSchema = Schema({

    _id: mongoose.Schema.Types.ObjectId,
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
    token:{
        type: String
    },
    // roles: {
    //     type: [
    //         {
    //             type: String,
    //             'enum': [
    //                 c.ROLE_ADMIN,
    //                 c.ROLE_USER,
    //                 c.ROLE_GEST
    //             ]
    //         }
    //     ],
    //     default: [c.ROLE_USER]
    // }


})

// to signup a user
// usersSchema.pre('save', (next) =>{

//     let user = this;

//     console.log(this)
//     bcrypt.genSalt(salt, (err, salt) =>{

//         if(err) return next(err)
//         bcrypt.hash(user.password, salt, (err, hash) =>{
//             if(err) return next(err)
//             user.password = hash;
//             next()
//         })

//     })

// })

//to login
usersSchema.methods.comparepassword = ( password, cb ) =>{

    bcrypt.compare(password, this.password, (err, isMath) =>{
        if(err) return cb(err)
        cb(null, isMath)
    })

}

// // generate token
// usersSchema.methods.generateToken = (cb) =>{

//     let user = this;
//     let token = jwt.sign(user._id.toHexString(),config.secret);
//     user.token = token;
//     user.save((err, user) =>{
//         if(err) return cb(err)
//         cb(null,user)
//     })

// }

// // find by token
// usersSchema.statics.findByToken = (token, cb)=>{

//     let user = this

//     jwt.verify(token, config.secret, (err, decode) =>{
//         user.findOne({"_id": decode, "token":token}, (err, user)=>{
//             if(err) return cb(err)
//             cb(user)
//         })
//     })

// }

//delete token
usersSchema.methods.deleteToken = (token, cb)=>{

    let user = this

    user.updateOne({$unset : {token :1}},(err, user)=>{
        if(err) return cb(err);
        cb(null, user);
    })

}

usersSchema.methods.matchesPassword = (password)=> {
    console.log(this.password)
    return bcrypt.compare(password, this.password)
}
  


module.exports = mongoose.model('User', usersSchema);