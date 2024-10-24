const express = require("express");
const router = express.Router();
const sendResponse = require("../helper/helper");
const { ObjectId } = require("mongodb");
const fetchUser = require("../../middleware/fetchUser");
const creditChecker = require("../../middleware/creditChecker");

router.post("/dashboard", fetchUser, async (req, res) => {
  try {
    let allDetails = {
      totalStrategy: 0,
      backtested: 0,
      pendingBacktested: 0,
      publicStrategy: 0,
      privateStrategy: 0,
      TotalBucket: 0,
      profitLoss: 0,
      bestStrategy: { name: "", profit: 0 },
      mostLikedStrategy: 0,
      profatableStartegy: 0,
      lossMakingStratgey: 0,
      BiggestLossStrategy: { name: "", loss: 0 },
    };
    let userId = req.userData.userId;
    //DB SETUP FOR DEATILS:-
    const db = req.app.locals.db;
    const Backtest = db.collection("backtestreasult");
    const Simple = db.collection("simpleStrategy");
    const Advance = db.collection("advancestrategy");
    const User = db.collection("User");
    const Bucket = db.collection("bucket");

    // CREDIT POINTS:-
    let creditPoint = await User.findOne({ _id: new ObjectId(userId) });
    allDetails.creditPoints = creditPoint.creditScore;

    //TOTAL STRATEGY SIMPLE AND ADVANCE BOTH:-
    let findSimple = await Simple.find({ user: userId }).toArray();
    let findAdvance = await Advance.find({ user: userId }).toArray();
    let totalStrategy = findSimple.length + findAdvance.length;
    allDetails.totalStrategy = totalStrategy;

    // backtested Strategy:-
    let mergeArrya = findSimple.concat(findAdvance);
    let backtestedStratgey = 0;

    mergeArrya.map((e) => {
      // console.log(e)
      if (e.backtest === true) {
        allDetails.backtested++;
      } else {
        allDetails.pendingBacktested++;
      }
    });

    // find total public and private Strategy:-
    mergeArrya.map((e) => {
      // console.log(e)
      if (e.privacy.toUpperCase() === "PUBLIC") {
        allDetails.publicStrategy++;
      } else {
        allDetails.privateStrategy++;
      }
    });

    // FIND BEST STRATEGY:-
    let find_Best_Strategy = await Backtest.find({ user: userId }).toArray();
    let suppose_Best_Strategy = find_Best_Strategy[0].backtestReasult.netProfit;
    let suppose_Best_Strategy_Name = find_Best_Strategy[0].strategyName;

    find_Best_Strategy.map((e) => {
      if (e.backtestReasult.netProfit > suppose_Best_Strategy) {
        allDetails.bestStrategy.name = e.strategyName;
        suppose_Best_Strategy = e.backtestReasult.netProfit;
        allDetails.bestStrategy.profit = e.backtestReasult.netProfit;
        suppose_Best_Strategy_Name = e.strategyName;
      } else {
        allDetails.bestStrategy.name = suppose_Best_Strategy_Name;
        allDetails.bestStrategy.profit = suppose_Best_Strategy;
      }
    });

    // find overall profit loss:-
    let overAll = 0;
    find_Best_Strategy.map((e) => {
      overAll = overAll + e.backtestReasult.netProfit;
    });
    allDetails.profitLoss = overAll;

    // biggest loss strategy:-
    let biggest_Loss_Strategy_name = "";
    let biggest_Loss_Strategy_Loss = 0;
    biggest_Loss_Strategy_name = find_Best_Strategy[0].strategyName;
    biggest_Loss_Strategy_Loss =
      find_Best_Strategy[0].backtestReasult.netProfit;
    find_Best_Strategy.map((e) => {
      if (e.backtestReasult.netProfit < 0) {
        if (biggest_Loss_Strategy_Loss > e.backtestReasult.netProfit) {
          biggest_Loss_Strategy_Loss = e.backtestReasult.netProfit;
          biggest_Loss_Strategy_name = e.strategyName;
          allDetails.BiggestLossStrategy.name = biggest_Loss_Strategy_name;
          allDetails.BiggestLossStrategy.loss = biggest_Loss_Strategy_Loss;
        } else {
          allDetails.BiggestLossStrategy.name = biggest_Loss_Strategy_name;
          allDetails.BiggestLossStrategy.loss = biggest_Loss_Strategy_Loss;
        }
      }
    });

    // find total profatbale stratgey and loss stratgey:-
    find_Best_Strategy.map((e)=>{
      if(e.backtestReasult.netProfit>0){
        allDetails.profatableStartegy++;
      }
      else{
        allDetails.lossMakingStratgey++;
      }
    })
    // find total number of bucket :-
    let findBcuket=await Bucket.find({user:userId}).toArray();
    console.log(findBcuket)
    allDetails.TotalBucket=findBcuket.length;
    

    return sendResponse(res, 200, "successfully get", allDetails, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});
module.exports = router;
