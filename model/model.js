const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    productName :{
        type:String,
    },
    productCode :{
        type:Number,
    },
    dosageForm :{
        type:String,
    },
    packingForm :{
        type:String,
    },
    packingDisplay :{
        type:String,
    },
    packingSize :{
        type:Number,
    },
    weight :{
        type:Number,
    },
    care :{
        type:Boolean,
        default:false,
    },
    salt :{
        type:String,
    },
    saltGroup :{
        type:String,
    },
    condition :{
        type:String,
    },
    manufacturer :{
        type:String,
    },
    mrp :{
        type:Number,
    },
    price :{
        type:Number,
    },
    discount :{
        type:String,
    },
    tax :{
        type:String,
    },
    superSpeciality :{
        type:String,
    },
    hsn :{
        type:Number,
    },
    country :{
        type:String,
    },
    prescription :{
        type:Boolean,
        default:false
    },
    abcd :{
        type:String,
    },
    visibility :{
        type:Boolean,
        default:false
    },
    stock :{
        type:Boolean,
        default:false
    },
})


const User = mongoose.model('User',medicineSchema);


module.exports={
    User,

}