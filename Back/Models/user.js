const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    occupation:{
        type:String,
        required:true,
        trim:true
       
    },
    telephone:{
        type:String,
        required:true,
        trim:true
    },

    city:{
        type:String,
        required:true,
        trim:true
    },
    interests:[{type:mongoose.Schema.Types.ObjectId, required:false,ref:'interests'}]

})

const User = mongoose.model('users',userSchema);
module.exports = User;