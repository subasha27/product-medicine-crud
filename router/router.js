const express = require("express");
const router = express.Router();
const controllerFunction = require("../controller/function");
const multerCall = require("../multer");



router.post('/addMedicine',controllerFunction.addMedicines);
router.get('/downloadData',controllerFunction.downloadDetails);
router.post('/uploadData',multerCall.manageFile,controllerFunction.uploadDetails);







module.exports = router;