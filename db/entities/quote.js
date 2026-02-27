const { JoinColumn } = require("typeorm");

var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Quote",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    customer_id: {
      type: "int",
    },
    is_finalized: {
      type: Boolean,
    },
    discount_type: {
      type: String,
    },
    discount_amount: {
      type: "double",
    },
    is_sanctioned: {
      type: Boolean,
    },
  },
  relations: {
    customer: {
      target: "Customer",
      type: "many-to-one",
      joinColumn: {
        name: "customer_id",
        referencedColumnName: "id",
      },
      cascade: true,
    },
    lineitems: {
      target: "LineItem",
      type: "one-to-many",
      inverseSide: "quote",
    },
  },
});
