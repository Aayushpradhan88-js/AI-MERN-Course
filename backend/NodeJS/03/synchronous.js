const fs = require('fs');

console.log("program started");

const data = fs.readFileSync('nodedoc.txt', 'utf-8');
console.log("data ko file read bhayo")
const data2 = fs.readFileSync('nodedoc2.txt', 'utf-8');
console.log("data2 ko file read bhayo")
// console.log("Data:", data);

console.log("file read completed");
console.log("program ended");

// Bank

// customer1  -> customer2  -> customer3  -> customer4  -> customer5