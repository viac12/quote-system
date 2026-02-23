var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET users listing. */
router.get("/users", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/quotes", (req, res, next) => {
  res.render("quote", {
    quotes: [
      {
        id: "5",
        description: "Heater tuneup",
        price: 240,
        associate: "John Doe",
        status: "Open",
      },
      {
        id: "6",
        description: "Furnace removal",
        price: 240,
        associate: "Dave",
        status: "Open",
      },
      {
        id: "6",
        description: "Furnace removal",
        price: 240,
        associate: "Dave",
        status: "Open",
      },
      {
        id: "6",
        description: "Furnace removal",
        price: 240,
        associate: "Dave",
        status: "Open",
      },
    ],
  });
});
module.exports = router;
