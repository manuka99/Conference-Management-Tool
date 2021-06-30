const request = require("../models/workshop_register");
const router = require("express").Router();

//user add new request for register workshop
exports.newRequest = async (req, res) => {
    try{
        const {name, affiliation, email, preferedWorkshop, statementOfInteres, paymentType, paymentValue,  date} = req.body;
        var Request = new request({
            name, 
            affiliation, 
            email, 
            preferedWorkshop, 
            statementOfInteres, 
            paymentType, 
            paymentValue,  
            date
        });
        
        Request = await Request.save();
        //sucess message
        return res.status(200).json({Request});
    }catch(error){
        //err response
        console.log(error);
        res.status(400).json({message : error})
    }
};

// retrieve all
exports.all = async(req, res) => {
    return res.status(200).json(await request.find());
};