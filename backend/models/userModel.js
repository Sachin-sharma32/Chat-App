const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            reqiuire: true,
        },
        email: {
            type: String,
            reqiuire: true,
        },
        password: {
            type: String,
            reqiuire: true,
        },
        passwordConfirm: {
            type: String,
            reqiuire: true,
        },
        image:String
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
