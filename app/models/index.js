const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.transactionItem = require("./transactionItem.model.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);


db.transaction.belongsToMany(db.product, {
  through: db.transactionItem,
  foreignKey: "transactionId",
  otherKey: "productId",
  as: "products"
});

db.product.belongsToMany(db.transaction, {
  through: db.transactionItem,
  foreignKey: "productId",
  otherKey: "transactionId",
  as: "transactions"
});

db.user.hasMany(db.transaction, {
  foreignKey: "userId",
  as: "transactions"
});

db.transaction.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.role.belongsToMany(db.user, {
  through: "user_roles"
});

db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
