const express = require("express");  // IMPORT EXPRESS
const router = express.Router();  // APPLY THE ROUTER
const sendResponse = require('../helper/helper');  // RETURN FUNCTION
const {  ObjectId } = require('mongodb');  // OBJECCTiD
const fetchUser=require('../../middleware/fetchUser')  // MIDDLEWARE FOR VERIFY THE USER

// REDUCE CREDITSCORE ROUTE :-
router.post('/reduceCredit',fetchUser,async(req,res)=>{
    try{
    //ALL THOSE THINGS THAT ARE NECESSARY ARE IN THIS ROUTE :-
    let userId=req.userData.userId;
    const db = req.app.locals.db; 
    const Bucket = db.collection('bucket');
    const User = db.collection('User');
    const Advance = db.collection('advancestrategy');
    const Simple = db.collection('simpleStrategy'); 
    let {name,type}=req.body;

    // IF NAME AND TYPE IS NOT PRESENT IN BODY THEN RETURN WITH ERROR
    if(!name || !type){
        return sendResponse(res,400,"name and type is requiored in body",null,false)
    }
    // IF TYPE IS EQUAL TO BUCKET :-
    if(type==="Bucket"){
        // FIND THE BUCKET :-
        let findBucket=await Bucket.findOne({bucketName:name,user:userId})
        if(!findBucket){
            return sendResponse(res,400,"not bucket found",null,false)
        }
        // FIND HOW MANY STRATGEY IN GIVEN BUCKET:-
        let creditScore=findBucket.strategyArray.length;
        // FIND USER:-
        let finduser=await User.findOne({_id:new ObjectId(userId)})
        if(!finduser){
            return sendResponse(res,400,"user not found",null,false)
        }
        // FIND THE AVAILABLE CREDIT SCORE:-
        let countAvailableCreditScore=finduser.creditScore;

        // COUNT THE REMAINING CREDIT SCORE AFTER REDUCE THE CREDIT:-
        let finalCreditScore=countAvailableCreditScore-creditScore;
        // IF CREDIT SCORE IS LESS THAN 0 AFTER REDUCEING:-
        if(finalCreditScore<0){
            return sendResponse(res,400,"credit score is not enogh please recharge your plan",null,false)
        }
        // UPDATE THE CREDIT SCORE:-
        let reduceCredit = await User.updateOne(
            {  _id:new ObjectId(userId) },
            { $set: { creditScore: finalCreditScore } } 
        );
        // SET BACKTEST TRUE MEANS BACKTEST OF THIS BUCKET HAS BEEN RUN:-
        let updateBucket=await Bucket.updateOne({bucketName:name,user:userId},
            {$set:{backtest:true}
        })

        return sendResponse(res,200,"succefully",reduceCredit,true)
        
    }
    // IF TYPE IS EQUAL TO SIMPLE THEN SEARCH IN SIMPLE SCHEMA:-
    if(type==="simple"){
        // FIND SIMPLE STARTEGY :-
        let findsimple=await Simple.findOne({strategyName:name,user:userId})
        if(!findsimple){
            return sendResponse(res,400,"startegy not found",null,false)
        }
        // FINDuSER :-
        let finduser=await User.findOne({_id:new ObjectId(userId)})
        if(!finduser){
            return sendResponse(res,400,"user not found",null,false)
        }
        // FIND THE AVAILABLE CREDIT SCORE:-
        let countAvailableCreditScore=finduser.creditScore;
         // IF CREDIT SCORE IS LESS THAN 0 AFTER REDUCEING:-
        if(countAvailableCreditScore-1<0){
            return sendResponse(res,400,"credit score is not enogh please recharge your plan",null,false)
        }
        // UPDATE THE CREDIT SCORE:-
        let reduceCredit = await User.updateOne(
            {_id:new ObjectId(userId) },
            { $set: { creditScore: countAvailableCreditScore-1 } } 
        );
        // SET BACKTEST TRUE MEANS BACKTEST OF THIS STARTEGY HAS BEEN RUN:-
        let updateSimple=await Simple.updateOne({strategyName:name,user:userId},
            {$set:{backtest:true}
        })
        return sendResponse(res,200,"succefully",reduceCredit,true)
    }
    // IF TYPE IS EQUAL TO ADVANCE THEN SEARCH IN ADVANCE SCHEMA:-
    if(type==="advance"){
        // FIND ADVANCE STARTEGY :-
        let findAdvance=await Advance.findOne({strategyName:name,user:userId})
        if(!findAdvance){
            return sendResponse(res,400,"startegy not found",null,false)
        }
        // FINDUSEER:-
        let finduser=await User.findOne({_id:new ObjectId(userId)})
        if(!finduser){
            return sendResponse(res,400,"user not found",null,false)
        }
        // FIND THE AVAILABLE CREDIT SCORE:-
        let countAvailableCreditScore=finduser.creditScore;
        // IF CREDIT SCORE IS LESS THAN 0 AFTER REDUCEING:-
        if(countAvailableCreditScore-1<0){
            return sendResponse(res,400,"credit score is not enogh please recharge your plan",null,false)
        }
        // UPDATE THE CREDIT SCORE:-
        let reduceCredit = await User.updateOne(
            {_id:new ObjectId(userId) },
            { $set: { creditScore: countAvailableCreditScore-1 } } 
        );
        // SET BACKTEST TRUE MEANS BACKTEST OF THIS STARTEGY HAS BEEN RUN:-
        let updateAdvance=await Advance.updateOne({strategyName:name,user:userId},
            {$set:{backtest:true}
        })
        return sendResponse(res,200,"succefully",reduceCredit,true)
    }
    // IF INVALID TYPE
    else{
        return sendResponse(res, 400,"please enter valid type", null, false);
    }
    // CATCH BLOCK WHEN SOME INTERNAL SERVER ERROR OCCURED :-
}catch(error){
    return sendResponse(res, 500, error.message, null, false);
}
})
module.exports=router;