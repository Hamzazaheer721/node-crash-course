const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("request made");
})

server.listen(3030, 'localhost', ()=>{
    console.log("server open for listening");
})