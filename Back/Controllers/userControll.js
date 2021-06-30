const User = require('../Models/user');


const createUser = async (req,res) => {
    if (req.body){
        const user = new User (req.body);
        await user.save().then (data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send ({error:error.message})
        });       
}
}

const getAllUsers = async (req,res) => {

    await User.find({}).populate('interests','name description ').then(data => {
        res.status(200).send({data:data});   
    })
    .catch(error => {
        res.status(500).send ({error:error.message})
    });
}

const getOneUser = async (req,res) => {
    if(req.params && req.params.id){
     await User.findById(req.params.id).then(data =>{
        res.status(200).send({data:data});   
     }) .catch(error => {
        res.status(500).send ({error:error.message})
    });

    }
}





const getInterestsOfUsers = async (req,res) => {
    if(req.params && req.params.id){
     await User.findById(req.params.id).populate('interests','name description ').then(data =>{
        res.status(200).send({interests:data.interests});   
     }) .catch(error => {
        res.status(500).send ({error:error.message})
    });

    }
}












module.exports = {
    createUser,
getOneUser,
    getAllUsers,
    getInterestsOfUsers,
    
};