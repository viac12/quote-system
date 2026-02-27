var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Customer",
  tableName: "customer",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
  },
  relations: {
    quotes: {
      target: "Quote",
      type: "one-to-many",
      inverseSide: "customer",
    },
  },
});
