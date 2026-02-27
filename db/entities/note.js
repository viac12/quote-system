const { JoinColumn } = require("typeorm");
var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Note",
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
