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

// to signup a user
usersSchema.pre('save', function(next){

    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(salt,function(err,salt){
            if(err)return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })

        })
    }
    else{
        next();
    }
})

//to login
usersSchema.methods.comparepassword = function(password, cb ){

    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err) return cb(next)
        cb(null, isMatch)
    })

}

// generate token
usersSchema.methods.generateToken = function(cb){

    let user = this

    let token = jwt.sign(user._id.toHexString(),config.secret);
    user.token = token;
    
    user.save((err, user) =>{
        console.log(err)
        if(err) return cb(err)
        cb(null,user)
    })

}

// find by token
usersSchema.statics.findByToken = function(token, cb){

    let user = this;

    jwt.verify(token, config.secret, function(err, decode){
        user.findOne({"_id": decode, "token":token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })

}

//delete token
usersSchema.methods.deleteToken = (token, cb)=>{

    var user=this;

    user.updateOne({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })

}

module.exports = mongoose.model('User', usersSchema);