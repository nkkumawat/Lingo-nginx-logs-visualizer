const multer = require("multer");
const path = require("path");
var express = require("express");
var router = express.Router();

const { response } = require("../app");
const nginxLogsController = require("../controllers/nginxLogsController");

router.get("/", nginxLogsController.getNginxLogs);
router.get("/timeline", nginxLogsController.getStatusTimeLine);
router.get(
  "/route-vs-count/filter",
  nginxLogsController.getNginxStatusFilterLogs
);
router.get("/route-vs-count", nginxLogsController.getNginxStatusLogs);

module.exports = router;
