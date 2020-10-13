//streams: start using data before it is finished loading
const fs = require('fs');
const path1 = 'd:/Mern Projects/Node Crash Course/Node Basics/Streams and Buffers/blog.txt';
const path2 = 'd:/Mern Projects/Node Crash Course/Node Basics/Streams and Buffers/blog2.txt';

const readStream = fs.createReadStream(path1, {encoding : 'utf8'});
const writeStream = fs.createWriteStream(path2)

readStream.on('data', (chunk)=>{
    console.log("---------------- NEW CHUNK ------------------");
    console.log(chunk);
    writeStream.write('\n -------------------- Writing -------------------- \n')
    writeStream.write(chunk)
})

// alternate code for writing blog.txt data into blog2.txt
// readStream.pipe(writeStream);