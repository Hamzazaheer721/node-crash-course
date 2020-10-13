//reading file
var fs = require('fs');
const path = require('path');
let newPath = path.join(__dirname, 'wow.txt')
// console.log(newPath);
fs.readFile('d:/Mern Projects/Node Crash Course/Node Basics/File System/wow.txt', (err, data) =>{
    if(err) {
        console.log("Error while reading file");
    }
    else{
        console.log(data.toString());
    }
})


// writing file
fs.writeFile('d:/Mern Projects/Node Crash Course/Node Basics/File System/wow.txt', 'Hello World', () =>{
    console.log("file was written");
})

//creating new file with writeFile
fs.writeFile('d:/Mern Projects/Node Crash Course/Node Basics/File System/wow2.txt', 'Newly Created file', () =>{
    console.log("file was written");
})

// append file
fs.appendFile('./Node Basics/File System/wow2.txt', ' yo', (err) =>{
    if (err) throw err;
    console.log('Saved!');
});


// directories
if(!fs.existsSync('./Node Basics/File System/newDirectoryCreated')){
    fs.mkdir('./Node Basics/File System/newDirectoryCreated', (err) => {
        if(err) throw err;
        console.log("Directory Created");
    })
}
else{
    fs.rmdir('./Node Basics/File System/newDirectoryCreated', (err) =>{
        if(err) throw err;
        console.log("Directory Removed");
    })
}


if(fs.existsSync('./Node Basics/File System/wow3.txt')){
    fs.unlink('./Node Basics/File System/wow3.txt', (err) => {
        if(err) console.log(err);
        else{
            console.log("File deleted");
        }
    })
}
else{
    console.log("file doesn't exist");
}

