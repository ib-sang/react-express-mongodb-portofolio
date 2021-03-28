// Independencies
const mongoose = require('mongoose');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const {auth, guest} =require('./../../middlewares/auth');
const c = require('../../config/constants');
const {logIn, logOut} = require('./../../auth')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) =>{
    
    const filetype = file.mimetype;

    if(filetype ==='image/jpeg' || filetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({storage:storage, 
        limits:{fileSize: 1024*1024*5},
        fileFilter: fileFilter
});

// models
const User = require('../../models/users');

// All users
router.get('/', (req, res, next) =>{

    User.find()
    .select()
    .exec()
    .then(docs =>{
        res.status(200).json({
            message: 'All users',
            users: docs.map(doc =>{
                return {
                    _id: doc._id,
                    username: doc.username,
                    email: doc.email,
                    request: {
                        type: 'GET',
                        url: 'localhost:9000/api/auth/'+doc._id
                    }
                }
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

// Sign in
router.post('/signin', (req, res, next) => {

    const {email, password} = req.body;

    User.findOne({email: email})
    .exec()
    .then(user => {
        console.log(user)
        if(!user || user.matchesPassword((password))){
            return res.status(401).json({ isAuth : false,message : "Incorrect email or password"})
        }
        logIn(req, user._id)
        res.status(200).json({
            isAuth : true,
            id : user._id,
            email : user.email
        })

    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
        
    })

});

// Sign up
router.post('/signup', (req, res, next) =>{ 

    User.findOne({email: req.body.email})
    .exec()
    .then(user =>{
        console.log(user)
        if(user){
            return res.status(409).json({auth : false, message :"email exits"})
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{

                if(err){

                    console.log(err)
                    return res.status(500).json({
                        error: err
                    })

                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                    });

                    user.save()
                    .then(result =>{
                        console.log(result)
                        const id = result._id
                        logIn(req, id)
                        res.status(201).json({
                            message: "Createc user successfull",
                            createdUser: {
                                _id: id,
                                email: result.email,
                                request:{
                                    type: 'GET',
                                    url: 'localhost:9000/api/auth/'+id
                                }
                            }
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }

            })
        }
    })

});

// Current User
router.get('/:userID', (req, res, next) =>{
    // user dont token != 1
    const id = req.params.userID

    User.findById(id)
    .exec()
    .then(user =>{
        console.log(user)
        if(user){
            res.status(201).json({
                user: {
                    id: id,
                    email: user.email
                },
                request:{
                    type: 'GET',
                    description: 'getting all users',
                    url: 'http://localhost:9000/api/auth'
                }
            })
        }else{
            res.status(404).json({
                message: "No valid entry found for provided ID"
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})

//logout user
router.post('/logout', auth, (req, res, next) =>{

    logOut(req, res)
    res.status(200).json({ message: 'OK' })

})


module.exports =  router;