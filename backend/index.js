const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const conversationRouter = require("./routes/conversationRouter");
const messageRouter = require("./routes/messageRouter");
const uploadRouter = require("./routes/uploadRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/uploads", uploadRouter);
app.use(express.static("uploads"));

mongoose
    .connect(
        "mongodb+srv://sachin:sachin1234@cluster0.zqiy5mw.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((connection) => {
        console.log("connected to DB");
    });

app.listen(8000, () => {
    console.log("server is up and running");
});
