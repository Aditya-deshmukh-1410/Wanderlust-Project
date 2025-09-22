const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);// this module already contains username n password field , so no need to mention in schema
//  so the Schema will be
//-->  username,password,email

module.exports = mongoose.model("User", userSchema); 


