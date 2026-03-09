var express = require("express");
var router = express.Router();
const Quote = require("../db/entities/quote");
const LineItem = require("../db/entities/line_item");
const dataSource = require("../db");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET users listing. */
router.get("/users", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/quotes", async (req, res, next) => {
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

router.post("/quotes/:id/finalize", async (req, res, next) => {
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

module.exports = router;
