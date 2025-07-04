const db = require("../models");
const Product = db.product;

// Create a new Product
exports.create = (req, res) => {
  const { name, price, stock, description } = req.body;

  Product.create({ name, price, stock, description })
    .then(product => {
      res.status(201).send(product);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Get all products
exports.findAll = (req, res) => {
  Product.findAll()
    .then(products => {
      res.status(200).send(products);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Get product by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: "Product not found." });
      }
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Update a product
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Product updated successfully." });
      } else {
        res.status(404).send({ message: `Cannot update Product with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Delete a product
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Product deleted successfully." });
      } else {
        res.status(404).send({ message: `Cannot delete Product with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
