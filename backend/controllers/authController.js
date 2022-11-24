const User = require("../models/userModel");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {
        const user = await User.create({
            ...req.body,
            password: cryptoJs.AES.encrypt(
                req.body.password,
                "sachin"
            ).toString(),
        });
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
        data.push(user);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

exports.logIn = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("user not found");

        const hardPassword = cryptoJs.AES.decrypt(user.password, "sachin");
        const password = hardPassword.toString(cryptoJs.enc.Utf8);

        if (password !== req.body.password)
            res.status(401).json("incorrect password");

        const token = jwt.sign({ id: user._id }, "sachin", {
            expiresIn: "30d",
        });

        res.status(200).json({
            status: "success",
            data: {
                user,
                token,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
