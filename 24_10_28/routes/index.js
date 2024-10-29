var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Strona główna'});
});

router.get('/o-nas', async function (req, res, next) {
    var fs = require('fs/promises');
    var images = await fs.readdir('static');
    images = images.filter(function (image) {
        return image.startsWith('ematilore');
    });
    // log type of images element
    console.log(typeof images[0]);
    res.render('about', {title: 'O nas', images: images});
});

router.get('/kontakt', function (req, res, next) {
    res.render('contact', {title: 'Kontakt'});
});

router.get('/oferta', function (req, res, next) {
    res.render('services', {title: 'Oferta'});
});

router.post('/action', function (req, res, next) {
    console.log(req.body);
    const mariadb = require('mariadb');
    const pool = mariadb.createPool({
        host: 'localhost',
        user:'root',
        password: 'admin',
        connectionLimit: 5
    });
    pool.getConnection()
        .then(conn => {
            conn.query("INSERT INTO 24_10_28.messages (name, surname, email, message) VALUES (?, ?, ?, ?)", [req.body.name, req.body.surname, req.body.email, req.body.message])
                .then((rows) => {
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
        }).catch(err => {
            console.log(err);
        });
    res.redirect('/');
});

router.get('/api/contact-messages', function (req, res, next) {
    const mariadb = require('mariadb');
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        connectionLimit: 5
    });
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM 24_10_28.messages")
                .then((rows) => {
                    conn.end();
                    res.json(rows);
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
        }).catch(err => {
            console.log(err);
        });
});

router.get('/api/contact-messages/:id', function (req, res, next) {
    const mariadb = require('mariadb');
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        connectionLimit: 5
    });
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM 24_10_28.messages WHERE id = ?", [req.params.id])
                .then((rows) => {
                    if (rows.length === 0) {
                        res.status(404).json({message: 'Not found'});
                    } else {
                        res.json(rows);
                    }
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;
