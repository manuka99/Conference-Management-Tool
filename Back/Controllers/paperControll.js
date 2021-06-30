const Paper = require('../Models/paper');

const createPaper = async (req,res) => {
    if (req.body){
        const paper = new Paper (req.body);
        await paper.save().then (data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send ({error:error.message})
        });       
}
}

const getAllPapers = async (req,res) => {

    await Paper.find({}).then(data => {
        res.status(200).send({data:data});   
    })
    .catch(error => {
        res.status(500).send ({error:error.message})
    });
}

const getOnePaper = async (req,res) => {
    if(req.params && req.params.id){
     await Paper.findById(req.params.id).then(data =>{
        res.status(200).send({data:data});   
     }) .catch(error => {
        res.status(500).send ({error:error.message})
    });

    }
}


const updatePapers = async(req,res) => {
    if(req.params && req.params.id ){
        await Paper.findByIdAndUpdate(req.params.id,req.body).then(data =>{
           res.status(200).send({data:data});   
        }) .catch(error => {
           res.status(500).send ({error:error.message})
       });
   
       }

    }

    const deletePapers = async(req,res) => {
        if(req.params && req.params.id ){
            await Paper.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({success:true}); 
            }) .catch(error => {
               res.status(500).send ({error:error.message})
           });
       
           }
    
        }

module.exports = {
    createPaper,getAllPapers,getOnePaper,updatePapers,deletePapers
  
};