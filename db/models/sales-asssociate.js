const Sequelize = require("sequelize");
const sequelize = require("../database");

const Associate = sequelize.define("associate", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accumulated_commission: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

Associate.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Associate, { foreignKey: "user_id" });
