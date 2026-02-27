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
  const quotes = await quoteRepo.find({
    relations: {
      customer: true,
      lineitems: true,
    },
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
  });
});

module.exports = router;
