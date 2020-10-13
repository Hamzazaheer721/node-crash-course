const http = require('http');
const fs = require('fs');
const _ = require('lodash');
// refreshing browser will cause this function to be triggered again
const server = http.createServer((req, res) => {
    // console.log(req);
    console.log(req.url , req.method);

    //set header content as text
    // res.setHeader('Content-Type', 'text/plain')
    // res.write('hello, ninjas');
    // res.end();

    // setting header content as html type
    // res.setHeader("Content-Type", 'text/html');
    // res.write('<h1> HTML MODE</h1>')
    // res.write('<p> Heyyy Ninjas</p>')
    // res.end();

    //lodash tutorial
    // const num = _.random(1,20);
    // console.log(num);
    // const greet= _.once(() =>{
    //     console.log("Entered into function");
    // })
    // greet()
    // greet()


    let path = "../Requests and Responses/views/";
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path+='about.html'
            res.statusCode = 200;
            break;
        // redirect
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            break;
        default:
            path+= '404.html'
            res.statusCode = 404;
            break;    
    }


    // returning HTML Page
    fs.readFile(path , (err, data)=>{
        if(err){
            console.log(err);
        }
        else{

            //first method
            // res.write(data);
            // res.end();

            //second method
            res.end(data);
        }
    })
})

server.listen(3030, 'localhost', ()=>{
    console.log('Listening for requests on port 3030');
});
