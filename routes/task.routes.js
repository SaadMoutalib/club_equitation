module.exports = (app) => {
    const router = require("express").Router();
    const { authenticate } = require("../middleware/auth");
    const tasks = require("../controllers/task.controller");

    router.post("/", tasks.create);
    router.get("/", authenticate, tasks.findAll);
    router.get("/:id", authenticate, tasks.findOne);
    router.patch("/update/:id", authenticate, tasks.update);
    router.delete("/delete/:id", authenticate, tasks.delete);
    router.get("/user/:id", authenticate, tasks.findUserTasks);
    app.use("/api/tasks", router);
};