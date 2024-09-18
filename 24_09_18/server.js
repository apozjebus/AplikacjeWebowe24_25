var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    const url = req.url;
    if (url.startsWith('/get_params')) {

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