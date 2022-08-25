const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); 
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"5000kb"}));
app.use(fileUpload({useTempFiles: true}));

//config

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })}

// Route imports

const product = require("./routes/ProductRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v2",product);
app.use("/api/v2",user);
app.use("/api/v2",order);
app.use("/api/v2",payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

//middleware for error
app.use(errorMiddleware);

module.exports = app;