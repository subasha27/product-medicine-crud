const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./ExcelData");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const excelFileFilter = (req, file, cb) => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        cb(null, true); 
    } else {
        cb(new Error("Only Excel files are allowed"), false); 
    }
};

const upload = multer({ 
    storage:storage,
    fileFilter: excelFileFilter,
 });
//const uploadSingleFile = upload.single('user_data'); <= we can use this for single file
const manageFile = upload.fields([
    { name: 'user_data', maxCount: 1 } // for multiple file input
]);

module.exports = { manageFile };
