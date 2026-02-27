const { Double } = require("typeorm");
const { JoinColumn } = require("typeorm");

var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "LineItem",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    quote_id: {
      type: "int",
    },
    description: {
      type: String,
    },
    price: {
      type: "double",
    },
  },
  relations: {
    quote: {
      target: "Quote",
      type: "many-to-one",
      joinColumn: {
        name: "quote_id",
        referencedColumnName: "id",
      },
      cascade: true,
    },
  },
});
