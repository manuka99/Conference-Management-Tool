const {Schema, model } = require("mongoose");


const proposalSchema = new Schema({
    title : {
        type : String,
        required : [true, "Title is required."],
        minlength: [4, "Title must contain at least 4 characters."],
    },
    organizer_name: {
        type : String,
        required : [true, "Organizers name is required."],
        minlength: [4, "Organizer name must contain at least 4 characters."],
    },
    organizer_affiliation : {
        type : String,
        required : [true, "Organizer's affiliation is required."],
        minlength: [4, "Organizer's affiliation must contain at least 4 characters."],
    },
    organizer_email : {
        type : String,
        required : [true, "Organizer's emailis required."],
        match : [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    Scope : {
        type : String,
        required : [true, "Scope is required."],
        minlength: [100, "Scope must contain at least 100 characters."],
    },
    biography : {
        type : String,
        required : [true, "Biography is required."],
        minlength: [50, "Biography must contain at least 50 characters."],
    },
    potential_participant : {
        type : String,
        required : [true, "Potential Participant's name is required."],
        minlength: [50, "Potential Participant's name must contain at least 50 characters."],
    },
    duration : {
        type : String,
        required : [true, "Duration is required."],
        minlength: [4, "Duration must contain at least 4 characters."],
    },
    preferred_day : {
        type : Date,
        required : [true, "Date is required."],
        minlength: [4, "Date must contain at least 4 characters."],
    },
    referred_papers : {
        type : String,
        required : [true, "Referred papers is required."],
        minlength: [50, "referred papers must contain at least 50 characters."],
    },
},
    {timestamps : true}
);

module.exports = model("proposal", proposalSchema);