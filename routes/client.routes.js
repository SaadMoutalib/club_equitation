module.exports = (app) => {
const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const clients = require("../controllers/client.controller");
const DIR = "./public/client";
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

router.post("/", upload.single("picture"), clients.create);
router.post("/login", clients.login);
router.get("/", authenticate, clients.findAll);
router.get("/:id", authenticate, clients.findOne);
router.patch("/update/:id", authenticate, clients.update);
router.delete("/delete/:id", authenticate, clients.delete);

app.use("/api/clients", router);
};