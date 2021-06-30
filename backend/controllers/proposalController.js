const proposal = require("../models/workshop_proposal");
const router = require("express").Router();

//add new workshop conduct proposal
exports.newProposal = async (req, res) => {
    try{
        const {title, organizer_name,organizer_affiliation,organizer_email,Scope,biography,potential_participant, duration, preferred_day, referred_papers } = req.body;
        var Proposal = new proposal({
            title, 
            organizer_name,
            organizer_affiliation,
            organizer_email,
            Scope,
            biography,
            potential_participant, 
            duration, 
            preferred_day, 
            referred_papers 
        });
        //sucess message
        Proposal = await Proposal.save();
        return res.status(200).json({Proposal});
    }catch(error){
        //error message
        console.log(error);
        res.status(400).json({message : error})
    }
};

//retrieve all
exports.all = async (req, res) =>{ 
    return res.status(200).json(await proposal.find());
};

