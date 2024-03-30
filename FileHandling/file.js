const fs = require('fs')

//this is sync... file
//fs.writeFileSync('./test.txt', 'hello created new hey');

//this is async... creating file
//const fl = fs.writeFile('./test.txt', 'hello created with async', (err) => {});


//to read a file sync...
// const rd = fs.readFileSync('./note.txt', "utf-8");
// console.log(rd);


//to read file async...
// fs.readFile('./note.txt', 'utf-8', (err, data) => {
//     (err)? console.log('caught an error') : console.log(data);
// })

//to append in a file sync...
//fs.appendFileSync('./test.txt', `${Date.now()} Appending\n`)


//to copy a file
//fs.cpSync('./note.txt', './copy.txt');

//fs.unlinkSync('./copy.txt');


//to see the file's stats
//console.log(fs.statSync('./note.txt'))


// to make directories
// fs.mkdirSync('my-docss/a/b', {recursive: true});


//to see the number of cpu cores you havve in your os and which will tell the max number of threads you can have
const os = require('os');
console.log(os.cpus().length);