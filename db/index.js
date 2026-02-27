// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("quote_system", "root", "password", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
const typeorm = require("typeorm");
const DataSource = typeorm.DataSource;
const Customer = require("./entities/customer");
const Quote = require("./entities/quote");
const lineItem = require("./entities/line_item");
const salesAssociate = require("./entities/sales_associate");
const User = require("./entities/user");
const purchaseOrder = require("./entities/purchase_order");
const Note = require("./entities/note");

module.exports = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "quote_system",
  synchronize: true,
  logging: true,
  entities: [
    Customer,
    Quote,
    lineItem,
    salesAssociate,
    User,
    purchaseOrder,
    Note,
  ],
  subscribers: [],
  migrations: [],
});
