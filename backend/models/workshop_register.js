const {Schema, model } = require("mongoose");


const registerSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name is required."],
        minlength: [4, "Name must contain at least 4 characters."],
    },
    affiliation : {
        type : String,
        required : [true, "Affiliation is required."],
        minlength: [4, "Affiliation must contain at least 4 characters."],
    },
    email : {
        type : String,
        required : [true, "Emailis required."],
        match : [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    preferedWorkshop : {
        type : String,
        required : [true, "Workshop name is required."],
        minlength: [10, "Workshop name must contain at least 10 characters."],
    },
    statementOfInterest : {
        type : String,
        required : [false, "Statement is required."],
        minlength: [25, "Statement must contain at least 25 characters."],
    },
    paymentType: {
        type: String,
        required: [true, "Please provide the payment type"],
        minlength: [5, "Payment Type must contain at least 5 characters."],
      },
    
      paymentValue: {
        type: Number,
        required: [true, "Please provide the payment value"],
        minlength: [5, "Value must contain at least 50 characters."],
      },
    
      date: {
        type: Date,
        default: Date.now,
      },
},
    {timestamps : true}
);

module.exports = model("request", registerSchema);