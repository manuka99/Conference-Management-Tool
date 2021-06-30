const request = require("../models/conference_register");

//user add new conference
exports.newConfRequest = async (req, res) => {
    try{
        const {name, affiliation, email, preferedWorkshop, statementOfInterest} = req.body;
        var ConfRequest = new request({
            name, 
            affiliation, 
            email, 
            preferedWorkshop, 
            statementOfInterest 
        });
        
        ConfRequest = await ConfRequest.save();
        //success message
        return res.status(200).json({ConfRequest});
    }catch(error){
        //err response
        console.log(error);
        res.status(400).json({message : error})
    }
};

// retrieve all
exports.a11 = async(req, res) => {
    return res.status(200).json(await request.find());
};