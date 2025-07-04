module.exports = (sequelize, Sequelize) => {
  const TransactionItem = sequelize.define("transaction_items", {
    transactionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "transactions",
        key: "id"
      }
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    priceAtPurchase: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return TransactionItem;
};