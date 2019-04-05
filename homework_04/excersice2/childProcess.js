const fs = require('fs');

const largeFileReader = (file_path) => {
    const stream = fs.createReadStream(file_path);
    stream.on('data', (chunk) => {
        process.send(chunk.toString());
    });

    stream.on('end', () => {
        process.send(null);
    });
}

process.on('message', (file_path) => {
    largeFileReader(file_path);
});

