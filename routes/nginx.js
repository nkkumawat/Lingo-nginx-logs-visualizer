const multer  = require('multer');
const path  = require('path');
var express = require('express');
var router = express.Router();


const { response } = require('../app');
const nginxLogsController = require('../controllers/nginxLogsController');


router.get('/', nginxLogsController.getNginxLogs);
router.get('/:type/timeline', nginxLogsController.getStatusTimeLine);
router.get('/:type/filter', nginxLogsController.getNginxStatusFilterLogs);
router.get('/:type', nginxLogsController.getNginxStatusLogs);


module.exports = router;
