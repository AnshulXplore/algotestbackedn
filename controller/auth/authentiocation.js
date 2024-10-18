const nodemailer = require('nodemailer');
const express=require('express')
const router=express.Router();
const sendResponse = require('../helper/helper');
const {  ObjectId } = require('mongodb');
const { model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios=require('axios')
const  otpTemplateAdmin  = require('./otptemplate2');
const  otpTemplateUser  = require('./toptemplate');

// SET CREDENTIALS :-
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nishant.work113@gmail.com', 
        pass: 'dpjrgkhmqriowjqj', 
    },
});

// OTP GENREATOR :-
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); 
};

// SIGNUP USER ROUTE :-
router.post('/signup',async(req,res) =>{
    try{
        function getCurrentDateTime() {
            const now = new Date();
          
            const day = String(now.getDate()).padStart(2, '0'); // Day with leading zero
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
            const year = now.getFullYear(); // Year
          
            const hours = String(now.getHours()).padStart(2, '0'); // Hours with leading zero
            const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes with leading zero
            const seconds = String(now.getSeconds()).padStart(2, '0'); // Seconds with leading zero
          
            const date = `${year}-${month}-${day}`; // YYYY-MM-DD format
            const time = `${hours}:${minutes}:${seconds}`; // HH:MM:SS format
          
            return `Date: ${date}, Time: ${time}`;
          }
            let date=getCurrentDateTime()
            const {email,Name,password,phone}=req.body;
            const db = req.app.locals.db; 
            const User = db.collection('User');
            let findEmail=await User.findOne({email:email})
            if(findEmail){
                return sendResponse(res,400,"please select unique email",null,false)
            }
            if(!email || !Name || !password || !phone){
                return sendResponse(res,400,"please fill al the fields",null,false)
            }
            if(typeof(phone)=="string" || phone.toString().length>10 || phone.toString().length<10){
                return sendResponse(res,400,"please neter a valid phoneNumber",null,false)
            }
            const otp = generateOTP(); 
            const mailOptions = {
                to_email:email,
                subject: 'Your OTP Code for login in Arthlb-algoTest',
                body:otpTemplateUser(Name,otp),
            };
            const response = await axios.post('https://bizvaarta.com/wa459api/sendeexternalmail344ssfffddsccfgg45vc', mailOptions);
            console.log(response.data);
            const mailOptions2 = {
                to_email: "abhishek@bizvaarta.com",
                subject: 'New User Registered',
                body:otpTemplateAdmin(Name,otp)
            };
            await axios.post('https://bizvaarta.com/wa459api/sendeexternalmail344ssfffddsccfgg45vc', mailOptions2);
            const salt = await bcrypt.genSalt(10);
            let securePass = await bcrypt.hash(password, salt);
            let saveUser=await User.insertOne({email,Name,password:securePass,otp,verified:false,phone,creditScore:0,acountCreatedDate:date})
            return sendResponse(res,200,"saveUser cretaed succesfully",saveUser,true)
    }catch(error){
        return sendResponse(res, 500, error.message, null, false);
    }
})

// VERIFY OTP ROUTE :-
router.post('/verify-otp',async(req,res) => {
    try{
    let {otp}=req.body;
    if(!otp){
        return sendResponse(res,400,"please fill the otp field ",null,false)
    }
    const db = req.app.locals.db; 
    const User = db.collection('User');
    let verifyOtp=await User.findOne({otp:otp})
    if(verifyOtp){
        const verified = await User.updateOne(
            { otp: otp }, // Filter
            { $set: {verified:true,creditScore:20} } // Updated fields
        ); 
        return sendResponse(res,200,"user verified succesfully",verified,true)
    }
    else{
        return sendResponse(res,400,"incorrect otp",)
    }
}catch(error){
    return sendResponse(res, 500, error.message, null, false);
}
})

// LOGIN ROUTE :-
router.post('/login',async(req,res)=>{
    try{
    let {email,password}=req.body;
    if(!email || !password){
        return sendResponse(res,400,"please fill the email and password fields ",null,false)
    }
    const db = req.app.locals.db; 
    const User = db.collection('User');
    let findEmail=await User.findOne({email:email})
    if(!findEmail){
        return sendResponse(res,400,"Invalid email",null,false)
    }
    // COMPRE THE PASSWORD USING BCRYPT :-
    let passwordCompare = await bcrypt.compare(password, findEmail.password);
    console.log(password)
    console.log(findEmail.password)
    if (!passwordCompare) {
        return sendResponse(res,400,"Invalid password",null,false)
      }
      // AASIGN THE JWT AUTH TOKEN :-
    const JWT_SECRET = "anshul";
      const userData= {
        userId:findEmail._id ,
        email:email
      }
      // SEND EMIAL AND USERID IN JWT TOKEN
      const jwtToken = jwt.sign(userData, JWT_SECRET, { expiresIn: '10d' });
      return sendResponse(res,200,"user login succesfully",jwtToken,true)
    }catch(error){
        return sendResponse(res,500,"Internal server error",error.message,false)
    }
})
module.exports=router;

