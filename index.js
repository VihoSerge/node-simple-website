const http = require('http');
const fs = require('fs');

const PORT = 8080;
const HOST = '127.0.0.1';

const requestListner = (req, res) => {
    const requestUrl = req.url === '/' ? '/index' : req.url;
    
    let filename = `.${requestUrl}.html`;
    let status = 200;
    fs.exists(filename, (exists) => {
        if(!exists) {
            filename = '404.html';
            status = 404
        }

        fs.readFile(filename, (err, data) =>{
            if(err) throw err;
            res.writeHead(status, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    });
}

http.createServer(requestListner)
    .listen(PORT, HOST, () => { console.log(`Server listing on ${PORT} at ${HOST}`); });