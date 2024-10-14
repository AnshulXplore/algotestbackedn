const express = require("express");
const router = express.Router();
const sendResponse=require('../helper/helper')
const checkLegsValidation=require('../conditions/checkadvanceleg');


// Route to create a new advance strategy
router.post("/advancestrategy", async (req, res) => {
    try{
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy'); 
    const strategy = req.body;
    const { isValid, message } = checkLegsValidation(strategy);
    if (!isValid) return sendResponse(res, 400, message, null, false);
    
     const result = await collection.insertOne(strategy); // MongoDB में डॉक्यूमेंट इंसर्ट करें


    return sendResponse(res,200,"sucess",result,true)
    }catch(error){
        return sendResponse(res,500,error.message,null,false)

    }
});

router.put('/updateadvancestrategy', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('advancestrategy');
        const strategy = req.body;

        const { isValid, message } = checkLegsValidation(strategy);
        if (!isValid) return sendResponse(res, 400, message, null, false);

        const existingStrategy = await collection.findOne({ strategyName: strategy.strategyName });

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
            if (!(key in strategy) && key !== '_id') { // Ignore _id field
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
            { strategyName: strategy.strategyName },
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




router.post('/getoneadvancestrategy',async(req,res)=>{
    try{
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy');
    const { strategyName } = req.body;
    if(!strategyName){
        return sendResponse(res,400,"please provide strategyName",null,false);
    }
    const result = await collection.findOne({strategyName:strategyName});
    if(!result){
        return sendResponse(res,400,"Strategy not found",null,false);
    }
    return sendResponse(res,200,"sucess",result,true);
    }catch(error){
        return sendResponse(res,500,error.message,null,false)
    }
})

router.post('/getalladvancestrategy',async(req,res)=>{
    try{
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy');
    const { userId } = req.body;
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

router.delete('/deleteadvancestrategy',async(req,res)=>{
    try{
    const db = req.app.locals.db; 
    const collection = db.collection('advancestrategy');
    const { strategyName } = req.body;
    if(!strategyName){
        return sendResponse(res,400,"please provide strategyName",null,false);
    }
    const result = await collection.deleteOne({strategyName:strategyName});
    if(result.deletedCount===0){
        return sendResponse(res,400,"Strategy not found",null,false);
    }
    return sendResponse(res,200,"strategy delete succefully",result,true);
    }catch(error){
        return sendResponse(res,500,error.message,null,false)
    }
})

module.exports = router;
