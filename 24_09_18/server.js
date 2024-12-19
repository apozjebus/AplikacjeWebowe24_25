var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    const url = req.url;

    if (url === '/main_page') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write('Strona główna');
        res.end();
    }
    else if (url === '/document') {
        const filePath = path.join(__dirname, 'package.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
                res.write('Błąd serwera');
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.write(data);
            res.end();
        });
    }
    else if (url === '/html') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const dynamicHtml = `
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <title>HTML</title>
            </head>
            <body>
                <h1>HTML</h1>
                <p>HTML</p>
            </body>
            </html>
        `;
        res.end(dynamicHtml);
    }
    else if (url === '/html2') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
                res.write('Błąd serwera');
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        });
    }
    else if (url.startsWith('/get_params')) {

        const params = url.split('?')[1].split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
        }, {});

        const now = new Date();
        const formattedDate = now.toLocaleDateString('pl-PL');
        const formattedTime = now.toLocaleTimeString('pl-PL');
        const timestamp = `${formattedDate}_${formattedTime.replace(/:/g, '-')}`;
        const fileName = `params_${timestamp}.json`;

        fs.writeFile(fileName, JSON.stringify(params), (err) => {
            if (err) {
                console.error(err);
                res.end('Error');
                return;
            }
            console.log('File saved');
        });

        res.end(JSON.stringify({ ok: 'ok' }));
    }

}).listen(8080);