// Independencies
const mongoose = require('mongoose');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config =require('./../../config')
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

    const {email, password, token} = req.body;
    
    // find by token
    User.findByToken(token, function(err, user){
        if(err) return  res.status(500).json({messageError:err});
        if(user){ 
            return res.status(400).json({
                error :true,
                message:"You are already logged in"
            })
        }else{
            User.findOne({email:email})
            .exec()
            .then( user =>{
                if(!user){
                    return res.status(401).json({isAuth : false, message : ' Auth failed ,email not found'})
                }

                user.comparepassword(password, (err,isMatch) => {
                    if(!isMatch) return res.status(401).json({ isAuth : false,message : "password doesn't match"});
                    user.generateToken((err, user) =>{
                        if(err) return res.status(400).send(err);
                        let id = user._id 
                        console.log(id)
                        res.cookie('auth',user.token).json({
                            isAuth : true,
                            id : id,
                            email : user.email,
                            auth: user.token
                        });
                        
                    })
                })
            })
        }
    })

});

// Sign up
router.post('/register', (req, res, next) =>{ 
    
    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: req.body.password,
                    });

    User.findOne({email: req.body.email})
    .exec()
    .then(user =>{
        console.log(user)
        if(user){
            return res.status(409).json({auth : false, message :"email exits"})
        }
        newUser.save((err, doc) =>{
            if (err) {
                console.log(doc)
                    return res.status(400).json({
                        success: false,
                        error: err
                    })

            }
            res.status(200).json({
                succes:true,
                user : doc
            });
        })
        // else{
        //     bcrypt.hash(req.body.password, 10, (err, hash) =>{

        //         if(err){

        //             console.log('password error: '+err)
        //             return res.status(500).json({
        //                 error: err
        //             })

        //         }else{
        //             const user = new User({
        //                 _id: new mongoose.Types.ObjectId(),
        //                 email: req.body.email,
        //                 password: hash,
        //             });

        //             user.save()
        //             .then(result =>{
        //                 console.log(result)
        //                 const id = result._id
        //                 console.log(id)
        //                 logIn(req, id)
        //                 return res.status(201).json({
        //                     message: "Createc user successfull",
        //                     createdUser: {
        //                         _id: id,
        //                         email: result.email,
        //                         request:{
        //                             type: 'GET',
        //                             url: 'localhost:9000/api/auth/'+id
        //                         }
        //                     }
        //                 })
        //             })
        //             .catch(err =>{
        //                 console.log("error post to database:"+err)
        //                 return res.status(500).json({
        //                     error: err
        //                 })
        //             })
        //         }

        //     })
        // }
    })

});

// User by userID
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
router.post('/logout', auth, function(req, res, next){

    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });

})

// Current User

router.get('/profile', auth, function(req, res){
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.firstname + req.user.lastname
        
    })
})


module.exports =  router;