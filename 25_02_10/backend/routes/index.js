var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/wpisy", async (req, res) => {
  const wpisy = await prisma.wpis.findMany();
  res.json(wpisy);
});

router.get("/wpis", async (req, res) => {
  const wpisy = await prisma.wpis.findMany({
    orderBy: {
      data: "desc",
    },
    take: 1,
  });

  if (wpisy.length > 0) {
    res.json(wpisy[0]);
  } else {
    res.status(404).json({ error: "No posts found" });
  }
});

router.get("/wpisy/:id", async (req, res) => {
  const { id } = req.params;
  const wpis = await prisma.wpis.findMany({
    where: { kategoriaId: Number(id) },
  });
  res.json(wpis);
});

router.get("/wpis/:id", async (req, res) => {
  const { id } = req.params;
  const wpis = await prisma.wpis.findUnique({
    where: { id: Number(id) },
  });
  res.json(wpis);
});

router.post("/wpis", async (req, res) => {
  const { tytul, tresc, autor, kategoriaId, zdjecie } = req.body;
  const wpis = await prisma.wpis.create({
    data: {
      tytul,
      tresc,
      autor,
      kategoriaId,
      zdjecie,
    },
  });
  res.json(wpis);
});

router.put("/wpis/:id", async (req, res) => {
  const { id } = req.params;
  const { tytul, tresc, autor, kategoriaId, zdjecie } = req.body;
  const wpis = await prisma.wpis.update({
    where: { id: Number(id) },
    data: {
      tytul,
      tresc,
      autor,
      kategoriaId,
      zdjecie,
    },
  });
  res.json(wpis);
});

router.delete("/wpis/:id", async (req, res) => {
  const { id } = req.params;
  const wpis = await prisma.wpis.delete({
    where: { id: Number(id) },
  });
  res.json(wpis);
});

router.get("/kategorie", async (req, res) => {
  const kategorie = await prisma.kategorie.findMany();
  res.json(kategorie);
});

router.get("/kategorie/:id", async (req, res) => {
  const { id } = req.params;
  const kategorie = await prisma.kategorie.findUnique({
    where: { id: Number(id) },
  });
  res.json(kategorie);
});

router.post("/kategoria", async (req, res) => {
  const { nazwa } = req.body;
  const kategoria = await prisma.kategorie.create({
    data: {
      nazwa,
    },
  });
  res.json(kategoria);
});

router.put("/kategoria/:id", async (req, res) => {
  const { id } = req.params;
  const { nazwa } = req.body;
  const kategoria = await prisma.kategorie.update({
    where: { id: Number(id) },
    data: {
      nazwa,
    },
  });
  res.json(kategoria);
});

router.delete("/kategoria/:id", async (req, res) => {
  const { id } = req.params;
  const kategoria = await prisma.kategorie.delete({
    where: { id: Number(id) },
  });
  res.json(kategoria);
});

router.get("/komentarze/:id", async (req, res) => {
  const { id } = req.params;
  const komentarze = await prisma.komentarz.findMany({
    where: { wpisId: Number(id) },
  });
  res.json(komentarze);
});

router.post("/komentarz", async (req, res) => {
  const { tresc, autor, wpisId } = req.body;
  const parsedWpisId = parseInt(wpisId, 10);
  const komentarz = await prisma.komentarz.create({
    data: {
      tresc,
      autor,
      wpisId: parsedWpisId,
    },
  });
  res.json(komentarz);
});

router.put("/komentarz/:id", async (req, res) => {
  const { id } = req.params;
  const { tresc, autor, wpisId } = req.body;
  const komentarz = await prisma.komentarz.update({
    where: { id: Number(id) },
    data: {
      tresc,
      autor,
      wpisId,
    },
  });
  res.json(komentarz);
});

router.delete("/komentarz/:id", async (req, res) => {
  const { id } = req.params;
  const komentarz = await prisma.komentarz.delete({
    where: { id: Number(id) },
  });
  res.json(komentarz);
});

module.exports = router;
