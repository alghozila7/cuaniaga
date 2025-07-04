const db = require("../models");
const Transaction = db.transaction;
const Product = db.product;
const TransactionItem = db.transactionItem;

// ✅ Create transaction for logged-in user
exports.create = async (req, res) => {
  const { paymentMethod, items } = req.body;
  const userId = req.userId; // ⬅️ From JWT middleware

  try {
    // Fetch involved products
    const productIds = items.map(i => i.productId);
    const products = await Product.findAll({ where: { id: productIds } });

    let totalAmount = 0;
    const transactionItems = [];

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(400).send({ message: `Product with ID ${item.productId} not found.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).send({ message: `Insufficient stock for product: ${product.name}` });
      }

      const price = product.price;
      totalAmount += price * item.quantity;

      transactionItems.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: price
      });
    }

    // ✅ Include userId here
    const transaction = await Transaction.create({
      userId,
      paymentMethod,
      totalAmount,
      status: "pending"
    });

    // Create TransactionItems & reduce stock
    for (const item of transactionItems) {
      await TransactionItem.create({
        transactionId: transaction.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase
      });

      const product = products.find(p => p.id === item.productId);
      await product.update({ stock: product.stock - item.quantity });
    }

    res.status(201).send({
      message: "Transaction created successfully.",
      transactionId: transaction.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

// ✅ Get all transactions for logged-in user
exports.findAllByUser = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId },
      include: [{
        model: db.product,
        as: "products",
        through: { attributes: ["quantity", "priceAtPurchase"] }
      }]
    });

    res.send(transactions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ✅ Get single transaction for logged-in user
exports.findOneByUser = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findOne({
      where: {
        id,
        userId: req.userId
      },
      include: [{
        model: db.product,
        as: "products",
        through: { attributes: ["quantity", "priceAtPurchase"] }
      }]
    });

    if (!transaction) {
      return res.status(404).send({ message: "Transaction not found." });
    }

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ✅ Admin or authorized user can update status
exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).send({ message: "Transaction not found." });
    }

    transaction.status = status;
    await transaction.save();

    res.send({ message: "Transaction status updated successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
