const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Semua user bisa lihat produk
  app.get("/api/products", controller.findAll);
  app.get("/api/products/:id", controller.findOne);

  // Hanya admin yang bisa create, update, dan delete produk
  app.post(
    "/api/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.put(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
