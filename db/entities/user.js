var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "User",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  relations: {
    sales_associate: {
      target: "SalesAssociate",
      type: "one-to-one",
      joinColumn: {
        name: "id",
        referencedColumnName: "user_id",
      },
      cascade: true,
    },
  },
});
