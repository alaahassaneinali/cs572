let http = require("http");
let fs = require("fs");
let path=require('path');

// create big file ~400 mg
// const file = fs.createWriteStream(path.join(__dirname,'./bigFile.txt'));
// for(let i=0; i<= 1e6; i++) {
//   file.write(i+ ': Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n');
// }
// file.end();


// using  buffer Asynchronous 
// We basically put the whole big.file content in memory before we wrote it out to the response object. This is very inefficient.
const server = http.createServer();
const filePath=path.join(__dirname,'./bigFile.txt');
server.on('request', (req, res) => {
  fs.readFile(path.join(__dirname,'./bigFile.txt'), (err, data) => {
    if (err) throw err;  
    res.end(data);
  });
});
server.listen(8000,()=>console.log('Listening on 8000'));


// using buffer Synchronous 
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let file = fs.readFileSync(path.join(__dirname,'./bigFile.txt'));
    res.end(file);
}).listen(5000, ()=>console.log('Listening on 5000'));



// using pipe
http.createServer(function (req, res) {
    
   fs.createReadStream(path.join(__dirname,'./bigFile.txt')).pipe(res);
   
}).listen(4000,()=>console.log('Listening on 4000'));


