//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const Blog = require('../models/blog');  //dont use dirname in this coz dirname is changed in this case.

const blog_index = (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then(result =>{
        res.render('blogs/index', {title : 'All blogs', blogs: result})
    })
    .catch(err => console.log(err))
}

const blog_details =  (req, res) => {
    console.log(req.params);
    const id = req.params.id; //to extract this id sent from index.ejs
    Blog.findById(id)
    .then(result => {
        res.render('blogs/details', {title : 'Blog Details', blog: result})
    })
    .catch(err => {
        console.log(err);
        res.status(404).render('404', {title: "Blog not found"})
    })
}

const blog_create_get = (req, res)=>{   //this should be placed above :id get
    res.render('blogs/create', {title : "Create a new blog"})
};

const blog_create_post = (req,res) => {
    console.log(req.body); //returns { title: 'My new blog', snippet: 'Snippet 3', name: 'Heyy i am tired' }
    const blog = new Blog(req.body); // since req.body is same object as blog
    blog.save().then((result)=>{
        res.redirect('/blogs');
    }).catch(err => console.log(err));
};

const blog_delete = (req,res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
    .then (result =>{
        // we can't redirect in this case
        // coz fetch from details.ejs was ajax request
        // so we will send JSON data back into database 
        // this JSON data will have redirect property
        res.json({redirect: '/blogs'})
        // server deletes the id and sends this json as response
        // this json object is then sent back to details.ejs 
        // in then method of that detail.ejs where we parse into js object
        // where we can use it as data 
    })
    .catch(err => console.log(err))
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}