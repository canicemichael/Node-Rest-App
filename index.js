require('express-async-errors');
const express = require("express");
const app = express();
let port = process.env.PORT || 8000;
const {logger} = require('./middleware/error');

const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan"); //first morgan
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require("./routes/posts");

const {error} = require('./middleware/error');

dotenv.config();

//{useNewUrlParser:true, useUnifiedTopology:true }
mongoose.connect("mongodb+srv://canice:canicemike@cluster0.wrcba.mongodb.net/social?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true })
    .then(() => logger.info(`Connected to MongoDb...`))

app.use(express.json());
app.use(helmet());
app.use(morgan("common")); //second morgan

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(error);

app.listen(port, () => {
    console.log(`Backend Server is running on port ${port}!`);
})