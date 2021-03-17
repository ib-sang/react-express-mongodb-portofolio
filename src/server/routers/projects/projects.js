// Dependances
const { Router } =require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const multer = require('multer');

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

const Project = require('./../../models/projects');
const Category = require('./../../models/category_projects');

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
                    imageProject: doc.imageProject,
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
router.post('/', upload.single('imageUser'), (req, res, next) =>{

    const title = req.body.title;

    Category.findById(req.body.category)
    .exec()
    .then(category =>{
        if(!category){
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        const project = new Project({
            _id: mongoose.Types.ObjectId(),
            title: title,
            slug: slug(title),
            description: req.body.description,
            imageProject: req.file.path
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
                imageProject: result.imageProject,
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
                    imageProject: resuult.imageProject
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
                data: {title: 'String', description: 'String', imageProject: 'File'}
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
