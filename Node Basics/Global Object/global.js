// console.log(global)

// we dont have to specify global to it though
global.setTimeout(() => {
    console.log("this will be loaded after 3 seconds");
    clearInterval(int); // will stop interval after 3 seconds basically
}, 3000);

const int = global.setInterval(() => {
    console.log("this will run after every 1 second");
}, 1000);

console.log(__dirname);
console.log(__filename);

//window object is not available in node neither does document which is inside window
