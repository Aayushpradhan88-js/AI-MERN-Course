const fs = require('fs'); //step:1 maa fs module import garnee 

/*
Create ---
Read ---
Update ---
Delete --
*/
 
// fs.readFile('message.txt', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log("message ko data ho:", data)
// })

// fs.unlink('message2.txt', (err) => {
//     if (err) throw err;
//     console.log('path/file.txt was deleted');
// });

// fs.writeFile('readme.md', 'This is a readme file', (err) => {
//     if(err) throw err;
//     console.log('The file has been saved!');
// })

// fs.appendFileSync('readme.md', 'Hello NodeJS', (err) => {
//     if(err) throw err;
//     console.log('The data to append was appended to file!');
// })





// fs.writeFile('nodedoc.txt', 'This is a nodejs doc file', (err) => {
//     if(err) throw err;
//     console.log('The file has been saved!');
// })
fs.writeFile('nodedoc1.txt', 'This is a nodejs doc file', (err) => {
    if(err) throw err;
    console.log('The file has been saved!');
})
fs.writeFile('nodedoc2.txt', 'This is a nodejs doc file', (err) => {
    if(err) throw err;
    console.log('The file has been saved!');
})
fs.writeFile('nodedoc3.txt', 'This is a nodejs doc file', (err) => {
    if(err) throw err;
    console.log('The file has been saved!');
})
fs.writeFile('nodedoc4.txt', 'This is a nodejs doc file', (err) => {
    if(err) throw err;
    console.log('The file has been saved!');
})