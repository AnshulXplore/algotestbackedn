const express = require("express");  // IMPORT EXPRESS
const router = express.Router();  // APPLY THE ROUTER
const sendResponse = require('../helper/helper');  // RETURN FUNCTION
const {  ObjectId } = require('mongodb');  // OBJECCTiD
const fetchUser=require('../../middleware/fetchUser')  // MIDDLEWARE FOR VERIFY THE USER

router.post('/creditHistory',fetchUser,async(req,res)=>{
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
        let {status,amount,payment_id,currency}=req.body;
        
        if(!status || !amount || !payment_id || !currency || typeof(amount) !='number'){
            return sendResponse(res,400,"some required fields are missing",null,false)
        }
        let userId=req.userData.userId;
        const db = req.app.locals.db; 
        const Payment = db.collection('paymentHistories');
        const User = db.collection('User');
        let saveData=await Payment.insertOne({status,amount,payment_id,currency,user:userId,date})
        let availableCredit = await User.findOne({ _id: new ObjectId(userId) });
        let updateCredit = await User.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { creditScore: availableCredit.creditScore + amount } }
          );
          
        return sendResponse(res,200,"Payment is Succesfully completetd",{updateCredit,saveData},true)
    }catch(error){
        return sendResponse(res, 500, error.message, null, false);
    }
})
module.exports=router;