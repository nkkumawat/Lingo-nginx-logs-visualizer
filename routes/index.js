const multer = require("multer");
const path = require("path");
var express = require("express");
var router = express.Router();

const { response } = require("../app");
const logFileController = require("../controllers/logFileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (ext === ".log" && ext !== ".txt") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {});
});

router.post("/upload", upload.single("log_file"), logFileController.setCookie);

module.exports = router;
