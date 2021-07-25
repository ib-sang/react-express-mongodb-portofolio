// Dependances
const { Router } =require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const path = './public/uploads/projects/'

const generateFormat = (file)=>{
    console.log(file.originalname)
    return new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
}

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path);
    },
    filename: function(req, file, cb){
        cb(null, generateFormat(file));
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

const Project = require('./../../models/projects');
const Category = require('../../models/categories');

router.get('/', (req, res,next) =>{

    Project.find()
    .exec()
    .then(docs =>{
        const docsLength = docs.length
        const respones = {
            counst : docsLength,
            projects: docs.map(doc =>{
                return {
                    title: doc.title,
                    description: doc.description,
                    image: doc.image,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:9000/api/projects/'+doc._id 
                    }
                }
            })
        }
        if(docsLength > 0){
            res.status(200).json(respones)
        }else{
            res.status(404).json({
                message: 'No entries found'
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            errorr: err
        })
    })

});

// Created Project
router.post('/', upload.single('image'), (req, res, next) =>{
 
    const title = req.body.title;

    Category.findById(req.body.category)
    .exec()
    .then(category =>{
        console.log(category)
        if(!category){
            return res.status(404).json({
                message: 'Category not found'
            }) 
        }
        const project = new Project({
            _id: mongoose.Types.ObjectId(),
            title: title,
            description: req.body.description,
            image: req.file.path,
            category: category
        });
        
        return project.save();
    })
    .then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Creatd Project successful',
            createdProject:{
                title: result.title,
                slug: result.slug,
                description: result.description,
                image: result.image,
                request: {
                    type: 'GET',
                    url: 'http://localhost:9000/api/projects/' + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

// Geting one Project
router.get('/:projectID', (req, res, next) =>{

    const id = req.params.projectID;

    Project.findById(id)
    .exec()
    .then(result =>{
        console.log(result)
        if(result){
            res.status(201).json({
                project: {
                    _id: result._id,
                    title: result.title,
                    slug: result.slug,
                    description: result.description,
                    image: result.image
                },
                request:{
                    type: 'GET',
                    description: 'GET_ALL_POSTS',
                    url: 'http://localhost:9000/api/projects'
                }
            })
        }else{
            res.status(404).json({message: "No valid entry found for provided ID"});
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

// Updating Project
router.patch('/:projectID', (res, req, next) =>{

    const id = req.params.projectID

    let updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    Project.updateOne({id: id}, {$set: updateOps})
    .exec()
    .then(doc =>{
        res.status(200).json({
            message: 'Project updated',
            request: {
                type: 'GET',
                url: 'http://localhost:9000/api/projects/' + id 
            } 
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})

// Deleting project
router.delete('/:projectID', (res, req, next) =>{

    const id = req.params.projectID;

    Project.remove({id : id})
    .exec()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            message: 'Project deleted',
            request : {
                type: 'POST',
                url: 'http://localhost:9000/api/projects',
                data: {title: 'String', description: 'String', image: 'File'}
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;
