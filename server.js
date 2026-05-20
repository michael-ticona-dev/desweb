const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    );

    const extname = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
    };

    const contentType =
        mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {

        if (err) {
            console.log(err);

            res.writeHead(404);
            res.end('Error 404: No encontrado');
            return;
        }

        res.writeHead(200, {
            'Content-Type': contentType
        });

        res.end(content);
    });

});

server.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});