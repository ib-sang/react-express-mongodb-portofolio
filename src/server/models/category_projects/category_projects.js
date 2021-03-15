const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoryProjectsSchema = Schema({

    _id: mongoose.Schema.Types.ObjectId$,
    name: {
        type: String,
        trim: true,
        require: true
    },
    slug:{
        type: String,
        trim: true,
        require: true
    }
    
})

module.exports = mongoose.model('category_projects', categoryProjectsSchema)