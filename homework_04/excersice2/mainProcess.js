    
const http = require('http');
const url = require('url');
const path = require('path');
const { fork } = require('child_process');

const server = http.createServer();

// http://localhost:4000/?url=/file.txt 

server.on("request", (req, res) => {
    const urlObj = url.parse(req.url, true);
    console.log(urlObj.query.url);
    if (urlObj.query.url) {
        const childProcess = fork(path.join(__dirname,'./childProcess.js'));
        childProcess.send(path.join(__dirname, urlObj.query.url));
        childProcess.on('message', (message) => {
            if (message == null) {
                res.end();
            } else if (message) {
                res.write(message.toString());
            }
        });
    }
})

server.listen(4000, () => {
    console.log('Server listening on 4000:');
});
