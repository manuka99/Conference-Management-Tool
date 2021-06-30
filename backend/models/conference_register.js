const {Schema, model } = require("mongoose");


const ConferenceSchema = new Schema({
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
        required : [true, "Statement is required."],
        minlength: [25, "Statement must contain at least 25 characters."],
    },
},
    {timestamps : true}
);

module.exports = model("conference", ConferenceSchema);