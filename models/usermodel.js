const mongoose  = require("mongoose");

const Userschema = mongoose.Schema({
    username: {
        type: String,
        required:[true, "Enter the username"]
    },
    email :{
        type: String,
        required:[true, "Please enter your email ID"],
        unique: [true, "This emial is taken!"]
    },
    password: {
        type: String,
        required:[true, "Enter your password"]
    }

},{
    timestamp: true
}
);

const User = mongoose.model("User", Userschema);
module.exports = User;
