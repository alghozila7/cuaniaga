module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    totalAmount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("pending", "paid", "cancelled"),
      defaultValue: "pending",
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      }
    }
  }, {
    timestamps: true,
  });

  return Transaction;
};
