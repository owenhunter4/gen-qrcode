const express = require("express");
const app = express();
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const server = app.listen(3000,()=>{
    console.log("server is running at port 3000");
});

app.post("/generateQR",(req,res)=>{
    const amount = parseFloat(_.get(req,["body","amount"]));
    const mobileNumber = "0993602342";
    const payload = generatePayload(mobileNumber,{amount});
    const option = {
        color:{
            dark: "#000",
            light: "#FFF"
        }
    }
    QRCode.toDataURL(payload,option,(err,url)=>{
        if(err){
            console.log("fail");
            return res.status(400).json({
                ResCode : 400,
                RespMessage : "bad : " + err
            });
        }else{
            return res.status(200).json({
                ResCode : 400,
                RespMessage : "good",
                Result : url
            });
        }
    })
});

module.exports = app;

