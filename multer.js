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
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only Excel files are allowed"), false); // Reject the file
    }
};

const upload = multer({ 
    storage:storage,
    fileFilter: excelFileFilter,
 });

const manageFile = upload.fields([
    { name: 'user_data', maxCount: 1 } // Changed field name to 'user_data'
]);

module.exports = { manageFile };