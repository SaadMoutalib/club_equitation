module.exports = (app) => {
    const router = require("express").Router();
    const { authenticate } = require("../../middleware/auth");
    const users = require("../controllers/user.controller");
  
    router.post("/", users.create);
    router.post("/login", users.login);
    router.get("/", authenticate, users.findAll);
    //router.get("/:id", authenticate, users.findOne);
    router.get("/user", authenticate, users.findOne);
    router.patch("/update/:id", authenticate, users.update);
    router.delete("/delete/:id", authenticate, users.delete);
  
    app.use("/api/users", router);
  };
  