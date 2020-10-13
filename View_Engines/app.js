const express = require('express');
const app = express();
const path = require ('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require(__dirname + '/models/blog');

const blogRoutes = require (__dirname +'/routes/blogRoutes')


app.set('views', path.join(__dirname + '/views'));
app.set('view engine','ejs');

//for making css 
//file accessible anywhere in directory by using just '/filename.css'content
app.use(express.static(path.join(__dirname + '/views', 'css'))) 

//for getting data from post method in create.ejs, we use following middleware
//takes all url encoded data and pass it inside request object.
app.use(express.urlencoded({extended: true}));


//connect to MongoDB
const dbURI = 'mongodb+srv://Hamzazaheer721:Hamzazaheer721@nodetuts.kculk.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) //asynchronous task
.then((result) =>{
     console.log("connected to db");
     app.listen(3030);
 }).catch(error => console.log(error))



app.use((req,res,next) => {
    console.log("The first middleware");
    next();
})

app.use((req,res,next)=>{
    console.log("The second middleware");
    next();
})

//3rd party middleware
app.use(morgan('dev'));
app.use(morgan('tiny'));

//putting blogs into db
app.get ('/add-blog', (req,res)=>{
    const blog = new Blog({
        title:'new blog',
        snippet: "about my new blog",
        body: 'more about my new blog'
    });
    //to save it to database with async method
    blog.save() //instance.save()
    .then((result)=>{
        res.send(result);
    }).catch(err => console.log(err));
})



//retreiving all blog from db
app.get('/all-blogs', (req,res)=>{
    Blog.find() // directly on Blog that we had exported
    .then(result =>{
        res.send(result)
    })
    .catch(err => console.log(err));
})

//retreiving single blog from db
app.get('/single-blog', (req,res)=>{
    Blog.findById('5f7fc30923f9d51df8371151')
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

// hardcoded homepage method
// app.get('/', (req,res)=>{
//     const blogs = [
//         {title : "Yoshi finds Food", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, dolorum."},
//         {title : "Mario finds star", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, dolorum."},
//         {title : "How to conquer Node.js", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, dolorum."}
//     ];
//     res.render('index', {title : "Home", blogs});
// })

app.get('/', (req,res) => {
    res.redirect('/blogs');
})



app.get('/about', (req,res)=>{
  res.render('about', {title : "About"})
})

//blog routes

// app.use(blogRoutes);

// /blogs/blogs will work for out project only now if all routes are like :
// /blogs/create, /blogs/:id etc in route file
// app.use('/blogs', blogRoutes);

// now we change all routes in route path like / instead of /blogs
// /blogs/ and /blogs is same thing
app.use('/blogs', blogRoutes);

app.use( (req, res)=>{
    res.status(404).render('404', {title : "404"})
})


// we dont want our server to be listening to request until
// db connection has been made so we will put it in above block in side db
// app.listen(3030);  