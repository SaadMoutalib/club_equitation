module.exports = (app) => {
    const router = require("express").Router();
    const { authenticate } = require("../../middleware/auth");
    const clients = require("../controllers/client.controller");
  
    router.post("/", clients.create);
    router.post("/login", clients.login);
    router.get("/", authenticate, clients.findAll);
    router.get("/:id", authenticate, clients.findOne);
    router.patch("/update/:id", authenticate, clients.update);
    router.delete("/delete/:id", authenticate, clients.delete);
  
    app.use("/api/clients", router);
  };