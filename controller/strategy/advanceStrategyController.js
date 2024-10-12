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
    checkLegsValidation(strategy,res)
    const result = await collection.insertOne(strategy); // MongoDB में डॉक्यूमेंट इंसर्ट करें
    // return sendResponse(res,200,"sucess",result,true)
    }catch(error){
        return sendResponse(res,500,error.message,null,false)

    }
});

router.put('/updateadvancestrategy',async(req,res)=>{
    try{
        const db = req.app.locals.db; 
        const collection = db.collection('advancestrategy'); 
        const strategy = req.body;
        checkLegsValidation(strategy,res)
        // if(strategy.strategyName){
        //     return sendResponse(res,400,"strategyName is not found in body",null,false)
        // }
        const result = await collection.updateOne(
            { strategyName: strategy.strategyName },
            { $set: strategy }
            
        ); 
        // return sendResponse(res,200,"sucess",result,true)
        }catch(error){
            return sendResponse(res,500,error.message,null,false)
    
        }
})

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
