const { authJwt } = require("../middleware");
const controller = require("../controllers/transaction.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const router = require("express").Router();

  // Hanya user yang login bisa membuat transaksi
  router.post("/", [authJwt.verifyToken], controller.create);

  // (Opsional) Ambil semua transaksi user yang login
  router.get("/", [authJwt.verifyToken], controller.findAllByUser);

  // (Opsional) Ambil detail transaksi
  router.get("/:id", [authJwt.verifyToken], controller.findOneByUser);

  app.use("/api/transactions", router);
};
