const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema ({

    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

   
    users:[{type:mongoose.Schema.Types.ObjectId, required:false,ref:'users'}]

    
});

const Interest = mongoose.model('interests',interestSchema);
module.exports = Interest;