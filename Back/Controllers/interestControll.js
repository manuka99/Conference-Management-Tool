const Interest = require('../Models/interest');

const createInterestField = async (req,res) => {
if (req.body) {
    const interest = new Interest (req.body);
    interest.save().then(data => {
        res.status(200).send ({data:data});
    })
    .catch(error => {
        res.status(500).send({error: error. message})
    });
}

}

const getAllInterestFields = async (req,res) => {

    await Interest.find({}).then(data => {
        res.status(200).send({data:data});   
    })
    .catch(error => {
        res.status(500).send ({error:error.message})
    });
}





module.exports = {
    createInterestField,getAllInterestFields
};
