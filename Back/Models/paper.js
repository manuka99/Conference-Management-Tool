const mongoose = require ("mongoose");

const paperSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    subject:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    pages:{
        type:Number,
        required:true,
       
    },
    date:{
        type:Date,
        default:Date.now
        } 

})

const Paper = mongoose.model('papers',paperSchema);
module.exports = Paper;