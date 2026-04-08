var express = require("express");
var router = express.Router();
const Quote = require("../db/entities/quote");
const LineItem = require("../db/entities/line_item");
const Note = require("../db/entities/note");
const dataSource = require("../db");

/* GET home page. */
router.get("/", (req, res, _next) => {
  res.render("index", { title: "Express" });
});

/* GET users listing. */
router.get("/users", (req, res, _next) => {
  res.send("respond with a resource");
});

router.get("/quotes", async (req, res, _next) => {
  const quoteRepo = dataSource.getRepository(Quote);
  const quoteID = req.query.id;
  const searchTerm = req.query.search;

  const whereParams = {};

  if (searchTerm) {
    whereParams["id"] = searchTerm;
  }

  const quotes = await quoteRepo.find({
    relations: {
      customer: true,
      lineitems: true,
      notes: true,
    },
    where: whereParams,
  });

  let selectedQuote;
  for (const quote of quotes) {
    if (quote.id == quoteID) {
      selectedQuote = quote;
      break;
    }
  }

  res.render("quote", {
    quotes,
    selectedQuote,
    req,
  });
});

router.post("/quotes/:id/finalize", async (req, res, _next) => {
  const quoteRepo = dataSource.getRepository(Quote);
  const quoteID = Number(req.params.id);
  const updateResult = await quoteRepo.update(quoteID, {
    is_finalized: () => "NOT is_finalized",
  });

  if (updateResult.affected == 0) {
    res.sendStatus(404);
  }

  const url = new URL("http://localhost:3000/quotes");
  url.searchParams.set("id", quoteID);
  res.redirect(url);
});

router.post("/quotes", async (req, res, _next) => {
  const quoteRepo = dataSource.getRepository(Quote);
  const newQuote = await quoteRepo.save({
    customer_id: req.body.customer,
    description: req.body.description,
  });

  const url = new URL("http://localhost:3000/quotes");
  url.searchParams.set("id", newQuote.id);
  res.redirect(url);
});

router.post("/quotes/:id/add-note", async (req, res, _next) => {
  const quoteRepo = dataSource.getRepository(Quote);
  const noteRepo = dataSource.getRepository(Note);
  const quoteID = Number(req.params.id);
  const quote = await quoteRepo.findOneBy({ id: quoteID });
  await noteRepo.save({
    quote_id: quote.id,
    description: req.body.description,
  });

  if (!quote) {
    return res.status(404).send("Quote not found");
  }

  quote.notes = req.body.notes;

  const url = new URL("http://localhost:3000/quotes");
  url.searchParams.set("id", quote.id);
  res.redirect(url);
});

router.post("/quotes/:id/add-lineitem", async (req, res, _next) => {
  const quoteRepo = dataSource.getRepository(Quote);
  const lineItemRepo = dataSource.getRepository(LineItem);
  const quoteID = Number(req.params.id);
  const quote = await quoteRepo.findOneBy({ id: quoteID });
  await lineItemRepo.save({
    quote_id: quote.id,
    description: req.body.description,
    price: req.body.price,
  });

  const url = new URL("http://localhost:3000/quotes");
  url.searchParams.set("id", quote.id);
  res.redirect(url);
});

router.post("/quotes/:id/remove-lineitem", async (req, res) => {
  const lineItemRepo = dataSource.getRepository(LineItem);

  const lineItemId = req.body.lineItemId;
  const quoteId = req.body.quoteId;

  await lineItemRepo.delete(lineItemId);

  res.redirect("/quotes?id=" + quoteId);
});

module.exports = router;
