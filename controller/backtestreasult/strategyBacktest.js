const express = require("express");
const router = express.Router();
const sendResponse = require('../helper/helper');
const {  ObjectId } = require('mongodb');
const fetchUser=require('../../middleware/fetchUser')

router.post('/backtestReasult',fetchUser,async(req,res)=>{
    try{
    let userId=req.userData.userId;

    const db = req.app.locals.db; 
    const Backtest = db.collection('backtestreasult'); 
    const {backtestReasult,strategyType,strategyName} = req.body;
    
    if(!backtestReasult || !strategyType ||!strategyName){
        return sendResponse(res,400,"please neter all details",null,false)
    }
    let alldata={}
    alldata.backtestReasult=backtestReasult;
    alldata.strategyType=strategyType;
    alldata.strategyName=strategyName;
    alldata.user=userId;

    let savebacktestReasult=await Backtest.insertOne(alldata)
    return sendResponse(res,200,"succesfullt backtest reasult save",savebacktestReasult,false)

}catch(error){
    return sendResponse(res,500,error.message,null,false)

}
})

module.exports=router