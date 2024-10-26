var express = require('express');
var fs = require('fs/promises');
var mime = require('mime-types');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Strona główna")
});

router.get('/json', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    const file = await fs.readFile('package.json', 'utf-8')
    res.send(file)
});

router.get('/html', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html')
    res.send("<h1>Strona HTML</h1>")
});

router.get('/htmlFile', async function(req, res, next) {
    res.setHeader('Content-Type', 'text/html')
    const file = await fs.readFile('./views/index.html', 'utf-8')
    res.send(file)
});

router.get('/get_params', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    dateAndTimePl = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })
    dateAndTimePl = dateAndTimePl.replace(/ /g, '_')
    dateAndTimePl = dateAndTimePl.replace(/:/g, '-')
    await fs.writeFile(`./assets/params_${dateAndTimePl}.json`, JSON.stringify(req.query, null, 2))
    res.send(JSON.stringify({"ok": "ok"}))
});

router.get('*', async function(req, res, next) {
    const path = `./assets/${req.url}`
    try {
        const file = await fs.readFile(path)
        const mimeType = mime.lookup(path)
        res.setHeader('Content-Type', mimeType || 'application/octet-stream')
        res.send(file)
    } catch (error) {
        res.status(404)
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({"error": "404 Not Found"}))
    }
});

module.exports = router;
