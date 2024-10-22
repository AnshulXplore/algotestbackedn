const express = require("express");
const router = express.Router();
const sendResponse = require('../helper/helper');
const {  ObjectId } = require('mongodb');
const fetchUser=require('../../middleware/fetchUser')
const creditChecker=require('../../middleware/creditChecker')
// SAVE THYE BACKTEST REASULT ON THIS ROUTE:-
router.post('/backtestReasult',fetchUser,creditChecker,async(req,res) => {
    try{
    let userId=req.userData.userId;
    // DB SETUP :-
    const db = req.app.locals.db; 
    const Backtest = db.collection('backtestreasult'); 
    const {backtestReasult,strategyType,strategyName} = req.body; // IN BODY BACKTESTREASULT,STRATEGYTYPE,STRATEGYNAME.
    // VALIDATIONS :-
    if(!backtestReasult || !strategyType ||!strategyName){
        return sendResponse(res,400,"please neter all details",null,false)
    }
    let alldata={}
    alldata.backtestReasult=backtestReasult;
    alldata.strategyType=strategyType;
    alldata.strategyName=strategyName;
    alldata.user=userId;
    // SAVE THE REASULT IN DB :-
    let savebacktestReasult=await Backtest.insertOne(alldata)
    return sendResponse(res,200,"succesfullt backtest reasult save",savebacktestReasult,false)
}catch(error){
    return sendResponse(res,500,error.message,null,false)
}
})

// COMPARE THE BACKTEST REASULT BETWEEN TWO STRATEGY ROUTE :-
router.post('/compareBacktest',fetchUser,creditChecker,async(req,res) => {
  try{
    let userId=req.userData.userId;
    // FIRST DB SETUP :-
    const db = req.app.locals.db; 
    const Backtest = db.collection('backtestreasult'); 
    // REQ.BODY :-
    let {strategyName1,strategyType1,strategyName2,strategyType2}=req.body;
    if(!strategyName1 && !strategyName2 || !strategyName1 && strategyName2 || strategyName1 && !strategyName2){
        return sendResponse(res,400,"please provide correct details in body",null,false);
    }
    // FIND BACKTEST OF THESE STRATEGY:-
    let findBacktest1=await Backtest.findOne({strategyName:strategyName1,strategyType:strategyType1,user:userId})
    if(!findBacktest1){
        return sendResponse(res,400,`please run the backtest for ${strategyName2} after you can able to use this feature!`,null,false);
    }
    let findBacktest2=await Backtest.findOne({strategyName:strategyName2,strategyType:strategyType2,user:userId})
    if(!findBacktest2){
        return sendResponse(res,400,`please run the backtest for ${strategyName2}  after you can able to use this feature!`,null,false);
    }
    return sendResponse(res,200,"comapre reasult succesfull",{1:findBacktest1,2:findBacktest2},true)
}catch(error){
    return sendResponse(res,500,error.message,null,false)
}
})

// GET SPECIFIC STARTEGY BACKTEST REASULT ROUTE :-
router.post('/getbackTest',fetchUser,async(req,res) => {
    try{
      let {strategyName,strategyType}=req.body
      if(!strategyName || !strategyType){
        return sendResponse(res,500,"missing required fields in body",null,false)
      }
      let userId=req.userData.userId;
      const db = req.app.locals.db; 
      const Backtest = db.collection('backtestreasult'); 
      const findBacktest=await Backtest.findOne({strategyName:strategyName,strategyType:strategyType,user:userId})
      if(!findBacktest){
        return sendResponse(res,500,"backtests not found",null,false)
      }
      return sendResponse(res,500,"backtests reasult succesfully found",findBacktest,true)
}catch (error) {
        return sendResponse(res,500,error.message,null,false)
    }
})
module.exports=router;

// GET ALL BACKTEST REASULT OF A SPECIFIC USER:-
router.post('/getAllbackTest',fetchUser,async(req,res) => {
    try{
      let userId=req.userData.userId;
      const db = req.app.locals.db; 
      const Backtest = db.collection('backtestreasult'); 
      const findBacktest=await Backtest.find({user:userId}).toArray();
      if(findBacktest.length<=0){
        return sendResponse(res,500,"backtests not founds",null,false)
      }
      return sendResponse(res,500,"backtests reasult succesfully found",findBacktest,true)
}catch (error) {
        return sendResponse(res,500,error.message,null,false)
    }
})
