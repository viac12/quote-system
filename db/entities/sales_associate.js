var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "SalesAssociate",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    user_id: {
      type: "int",
    },
    address: {
      type: "varchar",
    },
    accumulated_commission: {
      type: "double",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
      cascade: true,
    },
  },
});
