const mongoose = require("mongoose");

const contactsSchema =  mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        requird:true,
        ref:"User",
    },
    name:{
        type:String,
        required: [true , "Please add the contact name"],
    },
    email:{
        type:String,
        required: [true , "Please add the contact email"],
    },
    phone:{
        type:String,
        required: [true , "Please add the contact phone number"],
    },
},
{
    timestamps:true,
}
);
const Contact = mongoose.model("Contact", contactsSchema);
module.exports = Contact;