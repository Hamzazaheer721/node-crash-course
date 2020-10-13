const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema ({

    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{timestamps: true});

//wrapping schema inside model
// first arguement is Blog which constant name on LHS
// It will automatically find blogs named collection by guessing through Blog
// second arguement is our schema
const Blog = mongoose.model('Blog', blogSchema); 

//export it now

module.exports = Blog;