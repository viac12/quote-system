const { JoinColumn } = require("typeorm");

var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "PurchaseOrder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    quote_id: {
      type: "int",
    },
    discount_type: {
      type: String,
    },
    discount_amount: {
      type: "double",
    },
    sales_commission: {
      type: "double",
      nullable: true,
    },
    commission_rate: {
      type: "float",
      nullable: true,
    },
    processing_date: {
      type: "datetime",
      nullabe: true,
    },
  },
  relations: {
    quote: {
      target: "Quote",
      type: "one-to-one",
      joinColumn: {
        name: "quote_id",
        referencedColumnName: "id",
      },
      cascade: true,
    },
  },
});
