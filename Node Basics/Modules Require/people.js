const people = ['ali', 'ahmad', 'hamza', 'zaheer'];
const ages = [12,13,14,15];
console.log(people);

// module.exports = "hello"; //it will make xyz equal to hello
// module.exports = people; //it can only export one variable
module.exports = {
    log: people,
    omar : ages
}