module.exports = (app) => {
    const router = require("express").Router();
    const { authenticate } = require("../middleware/auth");
    const seances = require("../controllers/seance.controller");

    router.post("/", seances.create);
    router.get("/", authenticate, seances.findAll);
    router.get("/:id", authenticate, seances.findOne);
    router.get("/client/:id", authenticate, seances.findClientSeance);
    router.get("/monitor/:id", authenticate, seances.findClientSeance);
    router.patch("/update/:id", authenticate, seances.update);
    router.delete("/delete/:id", authenticate, seances.delete);

    app.use("/api/seances", router);
};