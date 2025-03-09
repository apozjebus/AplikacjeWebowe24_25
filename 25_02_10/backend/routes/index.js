var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wpisy', async (req, res) => {
  const wpisy = await prisma.wpis.findMany()
  res.json(wpisy)
})

router.post('/wpis', async (req, res) => {
  const { tytul, tresc, autor, kategoriaId, zdjecie } = req.body
  const wpis = await prisma.wpis.create({
    data: {
        tytul,
        tresc,
        autor,
        kategoriaId,
        zdjecie,
    },
  })
  res.json(wpis)
})

router.put('/wpis/:id', async (req, res) => {
    const { id } = req.params
    const { tytul, tresc, autor, kategoriaId, zdjecie } = req.body
    const wpis = await prisma.wpis.update({
        where: { id: Number(id) },
        data: {
            tytul,
            tresc,
            autor,
            kategoriaId,
            zdjecie,
        },
    })
    res.json(wpis)
})

router.delete('/wpis/:id', async (req, res) => {
    const { id } = req.params
    const wpis = await prisma.wpis.delete({
        where: { id: Number(id) },
    })
    res.json(wpis)
})

router.get('/kategorie', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany()
    res.json(kategorie)
})

router.post('/kategoria', async (req, res) => {
    const { nazwa } = req.body
    const kategoria = await prisma.kategoria.create({
        data: {
            nazwa
        },
    })
    res.json(kategoria)
})

router.put('/kategoria/:id', async (req, res) => {
    const { id } = req.params
    const { nazwa } = req.body
    const kategoria = await prisma.kategoria.update({
        where: { id: Number(id) },
        data: {
            nazwa
        },
    })
    res.json(kategoria)
})

router.delete('/kategoria/:id', async (req, res) => {
    const { id } = req.params
    const kategoria = await prisma.kategoria.delete({
        where: { id: Number(id) },
    })
    res.json(kategoria)
})

router.get('/komentarze', async (req, res) => {
    const komentarze = await prisma.komentarz.findMany()
    res.json(komentarze)
})

router.post('/komentarz', async (req, res) => {
    const { tresc, autor, wpisId } = req.body
    const komentarz = await prisma.komentarz.create({
        data: {
            tresc,
            autor,
            wpisId
        },
    })
    res.json(komentarz)
})

router.put('/komentarz/:id', async (req, res) => {
    const { id } = req.params
    const { tresc, autor, wpisId } = req.body
    const komentarz = await prisma.komentarz.update({
        where: { id: Number(id) },
        data: {
            tresc,
            autor,
            wpisId
        },
    })
    res.json(komentarz)
})

router.delete('/komentarz/:id', async (req, res) => {
    const { id } = req.params
    const komentarz = await prisma.komentarz.delete({
        where: { id: Number(id) },
    })
    res.json(komentarz)
})

module.exports = router;
