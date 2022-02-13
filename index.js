const express = require("express");
const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

//{useNewUrlParser:true, useUnifiedTopology:true }
mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to MongoDb");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8000, () => {
    console.log('Backend Server is running!');
})