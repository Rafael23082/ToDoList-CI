const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;