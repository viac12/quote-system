var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//const sequelize = require("./db");
const dataSource = require("./db");
const Customer = require("./db/entities/customer");
const Quote = require("./db/entities/quote");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

async function start() {
  await dataSource.initialize();
  const customerRepo = dataSource.getRepository(Customer);

  const firstCustomer = await customerRepo.findOneBy({});
  if (firstCustomer) {
    console.log("Customer found: " + firstCustomer.name);
  } else {
    console.log("No customers found");
    return;
  }
}

start();
module.exports = app;

//  const customerRepo = dataSource.getRepository("Customer");
//   const newCustomer = await customerRepo.save({
//     name: "test",
//     address: "1234",
//     email: "test@example.com",
//     phone: "1234567890",
//   });
//   console.log(`created: ${newCustomer.name}`);

// const quoteRepo = dataSource.getRepository(Quote);
// const newQuote = await quoteRepo.save({
//   customer_id: firstCustomer.id,
//   is_finalized: true,
//   discount_type: "percent",
//   discount_amount: 0.59,
//   is_sanctioned: true,
// });
// console.log(`created: ${newQuote.id}`);
