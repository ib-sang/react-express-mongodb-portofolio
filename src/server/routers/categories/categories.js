// Dependancies
const mongoose = require('mongoose');
const { Router } = require('express');
const express = require('express');
const router = express.Router();

const CategoryProject = require('../../models/categories');

router.get('/', (req, res, next) =>{

    CategoryProject.find()
    .exec()
    .then(docs =>{
        const categoryLength = docs.length;
        const responses = {
            counst : categoryLength,
            categoryProjects: docs.map(doc =>{
                return {
                    name: doc.name,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:9000/api/categories/'+doc._id
                    }
                }
            })
        }
        if(categoryLength>0){
            res.status(200).json(responses)
        }else{
            res.status(404).json({
                message: 'No entries found'
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

});

router.post('/', (req, res, next) =>{

    const name = req.body.name;

    const category = new CategoryProject({
        _id : mongoose.Types.ObjectId(),
        name: name,
    });
    category.save()
    .then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Created Category Project successful',
            createdCategory:{
                _id: result._id,
                name: result.name,
            },
            request: {
                type: 'GET',
                url: 'http://localhost:9000/api/categories/'+result._id
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

router.get('/:categoryID', (req, res, next) =>{

    const id = req.params.categoryID;

    CategoryProject.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc)
        if(doc){
            res.status(201).json({
                category: {
                    name: doc.name,
                    _id: doc._id,
                    slug: doc.slug
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:9000/api/category'
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

router.patch('/:categoryID', (req, res, next) =>{

    const id = req.params.categoryID;
    let updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    CategoryProject.updateOne({id: id}, {$set: updateOps})
    .exec()
    .then(result =>{
        if(result){
            res.status(201).json({
                message: 'Categorry Project updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:9000/api/category/' + result._id
                }
            })
        }else{
            res.status(404).json({
                message: 'not updated'
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

router.delete('/:categoryID', (req, res, next) =>{

    const id = req.params.categoryID;
    CategoryProject.remove({id: id})
    .exec()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            message: 'Category deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:9000/api/category',
                data: {name: 'String'}
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;