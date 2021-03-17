// Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectsSchema = Schema({

    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        trim: true,
        default:''
    },
    slug:{
        tyep: String,
        trim: true,
        require: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        trim: true,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category_projects',
        require: true
    }

})

module.exports = mongoose.model('projects', projectsSchema);