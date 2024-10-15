const Simplestrategy = require("../../schema/strategyBuilder"); // STRATEGY SCHEMA.
const Legs = require("../../schema/legBuilder"); // LEGS SCHEMA.
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const sendResponse = require("../helper/helper"); // THIS IS A HELPER FUNCTION FOR RETURN A RESPONSE AND ERROR.
const advance=require('../../schema/advanceStartegyBuilder');
const checkLegsValidation=require('../conditions/checksimpleleg')

// 1:- CREATE STRATEGY ROUTE
router.post("/createSimpleStrategy", async (req, res) => {
  try{
    const db = req.app.locals.db; 
    const collection = db.collection('simpleStrategy'); 
    const strategy = req.body;
    
    const { isValid, message } = checkLegsValidation(strategy);
    if(!isValid) return sendResponse(res, 400, message, null, false);

    // find strategy for avoid duplicate strategy name.
    let strategyName=strategy.strategyName;
    const findStartegy = await collection.findOne({strategyName:strategyName});

    if(findStartegy){
        return sendResponse(res,400,"please select a unique name",null,false);
    }
    
     const result = await collection.insertOne(strategy); 
     return sendResponse(res,200,"sucess",result,true)
    }catch(error){
        return sendResponse(res,500,error.message,null,false)

    }
});

//2:-UPDATE STRATEGY ROUTE :-
router.put("/updateSimpleStrategy", async (req, res) => {
  try {
    const db = req.app.locals.db; 
    const collection = db.collection('simpleStrategy'); 
    let strategy=req.body;
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
  }catch(error){
    return sendResponse(res, 500, error.message, null, false);
  }
});

//3:-DELETE STRATEGY ROUTE:-
router.delete("/deleteSimpleStrategy", async (req, res) => {
  try {
    const db = req.app.locals.db; 
    const collection = db.collection('simpleStrategy'); 
    let {strategyName}= req.body;
    //take by jwttoken
    let userId = "6510c7a0f64a3b0021d45c11";

    if (!strategyName) {
      return sendResponse(res,400,"please Provide strategyname for delete the strategyName",null,false);
    }

    let findStrategy = await collection.deleteOne({strategyName:strategyName,user:userId,});
    console.log(findStrategy)
    if (findStrategy.deletedCount==0) {
      return sendResponse(res,404,"provided Strategy Not found! something went wrong!",false,false);
    }

    return sendResponse(res,200,"Strategy deleted succesfully",findStrategy,true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

// 4:- GET ALL STRATEGY OF A PARTICULAR USER:-

router.get("/getSimpleStrategy", async (req, res) => {
  try {
    const db = req.app.locals.db; 
    const collection = db.collection('simpleStrategy'); 
    //take by jwttoken
    let userId = "6510c7a0f64a3b0021d45c11";

    let findAllStrategy = await collection.find({ user: userId }).toArray();
    if (!findAllStrategy) {
      return sendResponse(res, 400, "No Strategy Found", null, false);
    }
    return sendResponse(res,200,"find all strategy succesfully",findAllStrategy,true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

// 5:- FIND A SINGLE STRATEGY:-
router.post("/getOneSimpleStrategy", async (req, res) => {
  try {
    const db = req.app.locals.db; 
    const collection = db.collection('simpleStrategy'); 
    let { strategyName } = req.body;
    if (!strategyName) {
      return sendResponse(res, 400, "strategyName is required", null, false);
    }
    let userId = "6510c7a0f64a3b0021d45c11";

    let findOneStrategy = await collection.findOne({strategyName: strategyName,user: userId,});
    if (!findOneStrategy) {
      return sendResponse(res, 400, "No Strategy Found", null, false);
    }
    return sendResponse(res,200,"find one strategy succesfully",findOneStrategy,true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

// router.post('/advance',async(req,res)=>{
//   let findadvamce=await advance.find();
//   return res.json(findadvamce)
// })

module.exports = router;
