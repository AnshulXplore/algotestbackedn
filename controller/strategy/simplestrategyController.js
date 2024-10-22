// strategyController.js
const sendResponse = require("../helper/helper");
const checkLegsValidation = require("../conditions/checksimpleleg");
const { ObjectId } = require("mongodb");
// 1:- CREATE sTRATEGY ROUTE:-
exports.createSimpleStrategy = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const db = req.app.locals.db;
    const collection = db.collection("simpleStrategy");
    const strategy = req.body;

    const { isValid, message } = checkLegsValidation(strategy);
    if (!isValid) return sendResponse(res, 400, message, null, false);

    const strategyName = strategy.strategyName;
    const findStrategy = await collection.findOne({ strategyName, user: userId });

    if (findStrategy) {
      return sendResponse(res, 400, "Please select a unique name", null, false);
    }
    // some aditionals fields:-
    strategy.user = userId;
    strategy.backtest = false;
    strategy.privacy="PRIVATE";
    strategy.pricingModel="FREE"

    const result = await collection.insertOne(strategy);
    return sendResponse(res, 200, "Success", result, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
};
// 2:- UPDATE sTRATEGY ROUTE:-
exports.updateSimpleStrategy = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const db = req.app.locals.db;
    const collection = db.collection("simpleStrategy");
    const strategy = req.body;

    const { isValid, message } = checkLegsValidation(strategy);
    if (!isValid) return sendResponse(res, 400, message, null, false);

    const existingStrategy = await collection.findOne({
      strategyName: strategy.strategyName,
      user: userId,
    });

    if (!existingStrategy) {
      return sendResponse(res, 404, "Strategy not found", null, false);
    }

    const fieldsToSet = {};
    const fieldsToUnset = {};

    for (const key in strategy) {
      fieldsToSet[key] = strategy[key];
    }

    for (const key in existingStrategy) {
      if (!(key in strategy) && !["_id", "user", "backtest","privacy","pricingModel"].includes(key)) {
        fieldsToUnset[key] = "";
      }
    }

    const updateQuery = {};
    if (Object.keys(fieldsToSet).length > 0) updateQuery.$set = fieldsToSet;
    if (Object.keys(fieldsToUnset).length > 0) updateQuery.$unset = fieldsToUnset;

    if (Object.keys(updateQuery).length === 0) {
      return sendResponse(res, 400, "Nothing to update", null, false);
    }

    const result = await collection.updateOne(
      { strategyName: strategy.strategyName, user: userId },
      updateQuery
    );

    if (result.modifiedCount === 0) {
      return sendResponse(res, 400, "No data updated. Provide correct details.", null, false);
    }

    return sendResponse(res, 200, "Success", result, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
};
// 3:- DELETE sTRATEGY ROUTE:-
exports.deleteSimpleStrategy = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const db = req.app.locals.db;
    const collection = db.collection("simpleStrategy");
    const { strategyName } = req.body;

    if (!strategyName) {
      return sendResponse(res, 400, "Please provide a strategy name", null, false);
    }

    const findStrategy = await collection.deleteOne({ strategyName, user: userId });
    if (findStrategy.deletedCount === 0) {
      return sendResponse(res, 404, "Strategy not found", null, false);
    }

    return sendResponse(res, 200, "Strategy deleted successfully", findStrategy, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
};
// 4:- GETALL sTRATEGY ROUTE:-
exports.getSimpleStrategies = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const db = req.app.locals.db;
    const collection = db.collection("simpleStrategy");
    const strategies = await collection.find({ user: userId }).toArray();

    if (!strategies.length) {
      return sendResponse(res, 400, "No strategies found", null, false);
    }

    return sendResponse(res, 200, "Strategies retrieved successfully", strategies, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
};
// 5:- GET ONE SIMPLE STRATEGY ROUTE:-
exports.getOneSimpleStrategy = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const db = req.app.locals.db;
    const collection = db.collection("simpleStrategy");
    const { strategyName } = req.body;

    if (!strategyName) {
      return sendResponse(res, 400, "Strategy name is required", null, false);
    }

    const strategy = await collection.findOne({ strategyName, user: userId });
    if (!strategy) {
      return sendResponse(res, 400, "No strategy found", null, false);
    }

    return sendResponse(res, 200, "Strategy retrieved successfully", strategy, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
};

// 6:- CHANGE THE PRIVACY MODE ROUTE:-
exports.changePrivacy=async(req,res)=>{
  try{
      let {strategyName}=req.body;
      if(!strategyName){
          return sendResponse(res,400,"Missing required fields in body",null,false);
      }
      let userId=req.userData.userId;
       
      const db = req.app.locals.db;
      const Simple = db.collection("simpleStrategy");
      const SharedStrategy = db.collection('SharedStrategy'); // Shared strategy collection
      const User = db.collection('User'); // Shared strategy collection
      let findUser=await User.findOne({_id:new ObjectId(userId)})
      if(!findUser){
        return sendResponse(res,400,"User not found",null,false);
      }
      let findStrategy=await Simple.findOne({strategyName:strategyName,user:userId})
      if(!findStrategy){
          return sendResponse(res,400,"Strategy not found",null,false);
      }
      if(findStrategy.privacy.toUpperCase()==="PRIVATE"){
      let chech_backtest_status=findStrategy.backtest;
      if(!chech_backtest_status){
          return sendResponse(res,400,"first run backtest for this strategy",null,false);
      }
      let update=await Simple.updateOne({strategyName:strategyName,user:userId},
          {$set:{privacy:"PUBLIC"}}
      )
      let data={};
      data.strategy=findStrategy;
      data.likes=0;
      data.comments=[];
      data.status="AllUSer";
      data.user=userId;
      data.from=findUser.Name;
      data.strategyType="simple"
      data.strategyName=strategyName
      let saveData=await SharedStrategy.insertOne(data)
      return sendResponse(res,200,"strategy set public succesfully",{update,saveData},true)
  }
  else{
      let update=await Simple.updateOne({strategyName:strategyName,user:userId},
          {$set:{privacy:"PRIVATE"}}
      )
      let deletefrompublic=await SharedStrategy.deleteOne({user:userId,strategyName:strategyName,strategyType:"simple"})
      return sendResponse(res,200,"strategy set private succesfully",{update,deletefrompublic},true)
  }
  }catch(error){
      return sendResponse(res,500,error.message,null,false)
  }

}

