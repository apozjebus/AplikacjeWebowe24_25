var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Main page' });
});

router.get('/about', async function(req, res, next) {
    var fs = require('fs/promises');
    var images = await fs.readdir('static');
    images = images.filter(function (image) {
        return image.startsWith('ematilore');
    });
    // log type of images element
    console.log(typeof images[0]);
    res.render('about', { title: 'About', images: images });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services' });
});

module.exports = router;
