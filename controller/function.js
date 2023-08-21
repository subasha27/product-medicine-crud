const { exist } = require("@hapi/joi");
const {authSchema} = require("../validation/validation");
const {User} = require("../model/model");
const ExcelJS = require("exceljs");
const path = require("path");
const excelToJson = require('convert-excel-to-json');
const xlsx = require("xlsx");




const addMedicines = async(req,res)=>{
    try{
    const medicineValidity = authSchema.validate(req.body);
    if(medicineValidity.error){
        return res.status(400).json({ message: medicineValidity.error.details[0].message });
    }

    const existMed = await User.findOne({productName:req.body.productName})
    if (existMed){ return res.status(200).send({message:"Medicine Already exists"})}

    const medDetails = new User({
        productName : req.body.productName,
        productCode : req.body.productCode,
        dosageForm : req.body.dosageForm,
        packingForm : req.body.packingForm,
        packingDisplay : req.body.packingDisplay,
        packingSize : req.body.packingSize,
        weight : req.body.weight,
        care : req.body.care,
        salt : req.body.salt,
        saltGroup : req.body.saltGroup,
        condition : req.body.condition,
        manufacturer : req.body.manufacturer,
        mrp : req.body.mrp,
        price : req.body.price,
        discount : req.body.discount,
        tax : req.body.tax,
        superSpeciality : req.body.superSpeciality,
        hsn : req.body.hsn,
        country : req.body.country,
        prescription :req.body.prescription,
        abcd : req.body.abcd,
        visibility : req.body.visibility,
        stock : req.body.stock,
    })

    await medDetails.save();
    return res.status(200).send(` Medicine Added Successfully \n Created Id = ${medDetails._id},`) 

    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."})
    }
}


const getOne = async(req,res)=>{
    try{
        const productName = req.productName;
        const findName = await User.findOne(productName);
        if (!findName){
            return res.status(404).send({message:"Product Not Found"})
        }
        res.json({data: findName});

    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."});
    }
}

const updateMed = async(req,res)=>{
    try{
        const findId = req.params.id;
        const updateDetails = req.body;
        const validateUpDetails = authSchema.validate(updateDetails);
        if (validateUpDetails.error) {
            return res.status(400).json({ message: validateUpDetails.error.details[0].message });
        }

        const updateAllDetails = await User.findByIdAndUpdate(findId,{$set:updateDetails},{new:true});
        if (!updateAllDetails){
            return res.status(404).json({message:"Product Not Found"})
        }
        res.json({message:"Updated", data : updateAllDetails})

    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."});
    }
}


const delMed = async(req,res)=>{
    try{
        const removeMedId = req.params.id;
        const deleteMedicine = await User.findByIdAndDelete(removeMedId);
        if (!deleteMedicine){
            return res.status(404).json({message:"Med Not Found"})
        }
        res.json({message:"Deleted", data : deleteMedicine})
    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."});
    }
}

const getAll = async(req,res)=>{
    try{
        const findMed = await User.find().sort({_id : 1});
        res.json({data: findMed});
    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."});
    }
}



const downloadDetails = async(req,res)=>{
    try{
        const users = await User.find(); // Fetch all User data from MongoDB

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Data");

        worksheet.columns = [
            { header: "productName", key: "productName", width: 15 },
            { header: "productCode", key: "productCode", width: 15 },
            { header: "dosageForm", key: "dosageForm", width: 15 },
            { header: "packingForm", key: "packingForm", width: 15 },
            { header: "packingDisplay", key: "packingDisplay", width: 15 },
            { header: "packingSize", key: "packingSize", width: 15 },
            { header: "weight", key: "weight", width: 15 },
            { header: "care", key: "care", width: 15 },
            { header: "salt", key: "salt", width: 15 },
            { header: "saltGroup", key: "saltGroup", width: 15 },
            { header: "condition", key: "condition", width: 15 },
            { header: "manufacturer", key: "manufacturer", width: 15 },
            { header: "mrp", key: "mrp", width: 15 },
            { header: "price", key: "price", width: 15 },
            { header: "discount", key: "discount", width: 15 },
            { header: "tax", key: "tax", width: 15 },
            { header: "superSpeciality", key: "superSpeciality", width: 15 },
            { header: "hsn", key: "hsn", width: 15 },
            { header: "country", key: "country", width: 15 },
            { header: "prescription", key: "prescription", width: 15 },
            { header: "abcd", key: "abcd", width: 15 },
            { header: "visibility", key: "visibility", width: 15 },
            { header: "stock", key: "stock", width: 15 },
            
            // Excel format
        ];

        users.forEach((user) => {
            worksheet.addRow(user);
        });
        const excelBuffer = await workbook.xlsx.writeBuffer();
        const excelFileName = "user_data.xlsx"; // The name of the downloaded Excel file

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${excelFileName}`);
        res.send(excelBuffer);
    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."})
    }
}

const uploadDetails = async(req,res)=>{
    try{
        if (!req.files || !req.files['user_data'] || req.files['user_data'].length === 0) {
            return res.status(400).send({ message: 'No Excel file uploaded' });
        }

        const uploadedFile = req.files['user_data'][0];
        
        const workbook = xlsx.readFile(uploadedFile.path);
        const sheetName = workbook.SheetNames[0];
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        for (const newData of jsonData) {
            const { productCode } = newData;
            
            // Update the document based on the productCode
            await User.updateOne(
                { productCode: productCode }, // Update criteria based on 'productCode'
                { $set: newData },            // New data to update
                { upsert: true }              // Insert if the document doesn't exist
            );
        }


    return res.status(200).json({ message: 'File uploaded and data saved to MongoDB' });
    }catch(err){
        console.error(err);
        return res.status(500).send({message:"Server Error..."})
    }
}



module.exports={
    addMedicines,
    downloadDetails,
    uploadDetails,
    getOne,
    updateMed,
    delMed,
    getAll
}