const joi = require("@hapi/joi");



const authSchema = joi.object({
    productName : joi.string().min(3).required(),
    productCode : joi.number().required(),
    dosageForm : joi.string().min(3).max(20).required(),
    packingForm : joi.string().min(3).required(),
    packingDisplay : joi.string().min(3).max(20).required(),
    packingSize : joi.number().required(),
    weight : joi.number().required(),
    care : joi.boolean().required(),
    salt : joi.string().min(3).max(20).required(),
    saltGroup : joi.string().max(1).required(),
    condition : joi.string().min(3).max(20).required(),
    manufacturer : joi.string().min(3).max(20).required(),
    mrp : joi.number().required(),
    price : joi.number().required(),
    discount : joi.string().min(2).max(4).required(),
    tax : joi.string().min(2).max(4).required(),
    superSpeciality : joi.string().min(3).max(20).required(),
    hsn : joi.number().required(),
    country : joi.string().min(2).max(20).required(),
    prescription : joi.boolean().required(),
    abcd : joi.string().max(1).required(),
    visibility : joi.boolean().required(),
    stock : joi.boolean().required(),
})

module.exports={
    authSchema,

}