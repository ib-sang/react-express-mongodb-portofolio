// Independencies
const mongoose = require('mongoose');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const c = require('./../../config/constants');



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
const User = require('./../../models/users');


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
                        url: 'localhost:9001/api/users/'+doc._id
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
router.get('/login', (req, res, next) => {

    if(req.user !== null){
        return res.redirect('/');
    }

    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        console.log(user)
        if(user.length > 1){
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) =>{

            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if(result){
                const token  = jwt.sign({
                    email: user.email,
                    userID: user._id,
                    
                },
                process.env.JWT_KEY,
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
                )
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                })
                
            }
            res.status(401).json({
                message: "Auth failed"
            })
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
router.post('/signup',  upload.single('imageUser'), (req, res, next) =>{

    if(!req.body.username){
        req.body.username = req.body.email
    }

    User.findOne({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length>1){
            return res.status(409).json({
                message: 'Mail exits!'
            })
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
                        fullName: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                        imageUser: req.file.path,
                        roles: [c.ROLE_USER],
                
                    });

                    user.save()
                    .then(result =>{
                        console.log(result)
                        res.status(201).json({
                            message: "Createc user successfull",
                            createdUser: {
                                _id: result._id,
                                fullName: result.fullName,
                                email: result.email,
                                username: result.username,
                                password: result.password,
                                imageUser: result.imageUser,
                                request:{
                                    type: 'GET',
                                    url: 'localhost:9001/api/users/'+result._id
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

// Logout
router.post('/logout', (req, res, next) =>{

    User.findOne({email: user.email})
    .exec()
    .then()
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})


module.exports =  router;