const express = require("express");
const router = express.Router();
const controllerFunction = require("../controller/function");
const multerCall = require("../multer");



router.post('/addMedicine',controllerFunction.addMedicines);
router.get('/getOne',controllerFunction.getOne);
router.get('/getAll',controllerFunction.getAll);
router.put('/updateMed/:id',controllerFunction.updateMed);
router.delete('/deleteMed/:id',controllerFunction.delMed);
router.get('/downloadData',controllerFunction.downloadDetails);
router.post('/uploadData',multerCall.manageFile,controllerFunction.uploadDetails);







module.exports = router;