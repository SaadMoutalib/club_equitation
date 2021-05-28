module.exports = (app) => {
  const router = require("express").Router();
  const { authenticate } = require("../middleware/auth");
  const users = require("../controllers/user.controller");
  const DIR = "./public/user";
  const multer = require("multer");
  const { v4: uuidv4 } = require("uuid");

  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, uuidv4() + "-" + fileName);
  },
  });

  var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
      ) {
      cb(null, true);
      } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
  },
  });

  router.post("/", upload.single("picture"), users.create);
  router.post("/login", users.login);
  router.get("/", authenticate, users.findAll);
  //router.get("/:id", authenticate, users.findOne);
  router.get("/user", authenticate, users.findOne);
  router.patch("/update/:id", authenticate, users.update);
  router.delete("/delete/:id", authenticate, users.delete);

  app.use("/api/users", router);
};
  