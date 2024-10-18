const express = require("express");
const router = express.Router();
const sendResponse=require('../helper/helper')
const checkLegsValidation=require('../conditions/checkadvanceleg');
const fetchUser=require('../../middleware/fetchUser')
const creditChecker=require('../../middleware/creditChecker')
//1:- CREATE THE ADVANCE STRATEGY ROUTE :-
router.post("/advancestrategy",fetchUser,creditChecker,async (req, res) => {
    try{
    let userId=req.userData.userId;

    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy'); 
    const strategy = req.body;

    let findStartegy=await collection.findOne({strategyName:strategy.strategyName,user:userId})

    if(findStartegy){
        return sendResponse(res,400,"please select a unique name ",null,false)
    }


    const { isValid, message } = checkLegsValidation(strategy);
    if (!isValid) return sendResponse(res, 400, message, null, false);

    // more fields that enter from backend:-
    strategy.user=userId
    strategy.backtest=false
    
    // insert reasult in db with schema les aproach:-
     const result = await collection.insertOne(strategy); 


    return sendResponse(res,200,"sucess",result,true)
    }catch(error){
        return sendResponse(res,500,error.message,null,false)

    }
});

// 2:- UPDATE THE ADVANCE STRATEGY ROUTE :-
router.put('/updateadvancestrategy',fetchUser,creditChecker,async (req, res) => {
    try {
        let userId=req.userData.userId;
        const db = req.app.locals.db;
        const collection = db.collection('advancestrategy');
        const strategy = req.body;

        const { isValid, message } = checkLegsValidation(strategy);
        if (!isValid) return sendResponse(res, 400, message, null, false);

        const existingStrategy = await collection.findOne({ strategyName: strategy.strategyName,user:userId });

        if (!existingStrategy) {
            return sendResponse(res, 404, "Strategy not found", null, false);
        }

        const fieldsToSet = {};
        const fieldsToUnset = {};

        for (const key in strategy) {
            if (key in existingStrategy) {
                fieldsToSet[key] = strategy[key];
                // console.log("addd1")
            }
            else{
                fieldsToSet[key] = strategy[key];
                console.log("addelse")
            }
        }

        for (const key in existingStrategy) {
            if (!(key in strategy) && key !== '_id' && key !=='user' && key !=='backtest') { // Ignore these fields
                fieldsToUnset[key] = "";
                console.log("remove")
            }
        }

        const updateQuery = {};
        if (Object.keys(fieldsToSet).length > 0) updateQuery.$set = fieldsToSet;
        if (Object.keys(fieldsToUnset).length > 0) updateQuery.$unset = fieldsToUnset;

        // console.log("Update Query:", updateQuery);
        if (Object.keys(updateQuery).length === 0) {
            return sendResponse(res, 400, "Nothing to update", null, false);
        }

        const result = await collection.updateOne(
            { strategyName: strategy.strategyName,user:userId },
            updateQuery
        );

        if (result.modifiedCount === 0) {
            return sendResponse(res, 400, "No data updated. Provide correct details.", null, false);
        }

        return sendResponse(res, 200, "Success", result, true);
    } catch (error) {
        // console.error("Error:", error);
        return sendResponse(res, 500, error.message, null, false);
    }
});

//3:-GET ONE ADVANCE STRATEGY ROUTE :-
router.post('/getoneadvancestrategy',fetchUser,async(req,res)=>{
    try{
        let userId=req.userData.userId;
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy');
    const { strategyName } = req.body;
    if(!strategyName){
        return sendResponse(res,400,"please provide strategyName",null,false);
    }
    const result = await collection.findOne({strategyName:strategyName,user:userId});
    
    if(!result){
        return sendResponse(res,400,"Strategy not found",null,false);
    }
    return sendResponse(res,200,"sucess",result,true);
    }catch(error){
        return sendResponse(res,500,error.message,null,false)
    }
})

//4:- GET ALL ADVANCE ROUTE GET:-
router.post('/getalladvancestrategy',fetchUser,async(req,res)=>{
    try{
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy');
    let userId=req.userData.userId;
    if(!userId){
        return sendResponse(res,400,"please provide userId",null,false);
    }
    const result = await collection.find({user:userId}).toArray();
    if(result.length<=0){
        return sendResponse(res,400,"Strategy not found",null,false);
    }
    return sendResponse(res,200,"sucess",result,true);
    }catch(error){
        return sendResponse(res,500,error.message,null,false)
    }
})
// 5:- DELETE ADVANCE STARTEGY ROUTE:-
router.delete('/deleteadvancestrategy',fetchUser,creditChecker,async(req,res)=>{
    try{
        let userId=req.userData.userId;
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy');
    const { strategyName } = req.body;
    if(!strategyName){
        return sendResponse(res,400,"please provide strategyName",null,false);
    }
    const result = await collection.deleteOne({strategyName:strategyName,user:userId});
    if(result.deletedCount===0){
        return sendResponse(res,400,"Strategy not found",null,false);
    }
    return sendResponse(res,200,"strategy delete succefully",result,true);
    }catch(error){
        return sendResponse(res,500,error.message,null,false)
    }
})

module.exports = router;
