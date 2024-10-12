const Simplestrategy = require("../../schema/strategyBuilder"); // STRATEGY SCHEMA.
const Legs = require("../../schema/legBuilder"); // LEGS SCHEMA.
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const sendResponse = require("../helper/helper"); // THIS IS A HELPER FUNCTION FOR RETURN A RESPONSE AND ERROR.
const advance=require('../../schema/advanceStartegyBuilder');

// 1:- CREATE STRATEGY ROUTE
router.post("/createStrategy", async (req, res) => {
  try {
    let {
      strategyName,
      index,
      legs,
      entryTime,
      exitTime,
      overAllStopLoss,
      overAllTarget,
      profitReaches,
      lockProfit,
      trailStopLoss,
      user, //take by jwttoken
    } = req.body;

    let findStrategy = await Simplestrategy.findOne({
      strategyName: strategyName,
    });
    if (findStrategy) {
      return sendResponse(res,400, "Please Select a Unique name for your strategy",null,false);
    }

    // `legs` ko validate karenge
    if (!Array.isArray(legs) || legs.length === 0) {
      return sendResponse(res,400,"Legs are required and must be an array",null,false);
    }

    // Use a normal `for` loop or `forEach` here instead of `map` since you're not returning anything from `map`.
    for (let e of legs) {
      if (!e.segment || !e.Position || !e.Id) {
        return sendResponse(res,400,"Missing required fields for legs",null,false);
      }

      if (e.segment === "future") {
        // Don't require optionType, strikeCriteria, strikeType, or Expiry
      } else {
        if (!e.Expiry || !e.optionType || !e.strikeCriteria || !e.strikeType) {
          return sendResponse(res,400,"Missing required fields for non-future segments",null,false);
        }
      }

      if (e.targetProfit && e.targetProfit.enabled) {
        if (e.targetProfit.value === 0) {
          return sendResponse(res,400,"Target profit values cannot be 0 if enabled",null,false);
        }
      }

      if (e.stopLoss && e.stopLoss.enabled) {
        if (e.stopLoss.value === 0) {
          return sendResponse(res,400,"Stop loss values cannot be 0 if enabled",null,false);
        }
      }

      if (e.trailStopLoss && e.trailStopLoss.enabled) {
        if (e.trailStopLoss.valueX === 0 || e.trailStopLoss.valueY === 0) {
          return sendResponse(res,400,"Trail stop loss values cannot be 0 if enabled",null,false );
        }
      }

      // Assign updated or default values for each leg
      e.segment = e.segment;
      e.Expiry = e.segment === "future" ? undefined : e.Expiry;
      e.lots = e.lots || 1;
      e.optionType = e.segment === "future" ? undefined : e.optionType;
      e.strikeCriteria = e.segment === "future" ? undefined : e.strikeCriteria;
      e.strikeType = e.segment === "future" ? undefined : e.strikeType;
      e.targetProfit = e.targetProfit || {
        enabled: false,
        value: null,
        unit: "PTS",
      };
      e.stopLoss = e.stopLoss || { enabled: false, value: null, unit: "PTS" };
      e.trailStopLoss = e.trailStopLoss || {
        enabled: false,
        valueX: null,
        valueY: null,
        unit: "PTS",
      };
      e.Id = e.Id;
    }

    // Create new strategy data
    let strategyData = {
      strategyName: strategyName || "new Strategy",
      index,
      legs,
      entryTime,
      exitTime,
    };

    // Optional fields if available
    if (overAllStopLoss) strategyData.overAllStopLoss = overAllStopLoss;
    if (overAllTarget) strategyData.overAllTarget = overAllTarget;
    if (trailStopLoss) strategyData.trailStopLoss = trailStopLoss;

    // lockProfit data
    if (profitReaches || lockProfit) {
      strategyData.lockProfit = {};
      if (profitReaches) strategyData.lockProfit.profitReaches = profitReaches;
      if (lockProfit) strategyData.lockProfit.lockProfit = lockProfit;
    }

    if (user) strategyData.user = user;

    // Create strategy instance and save
    let createStrategy = new Simplestrategy(strategyData);
    await createStrategy.save();

     return res.json(createStrategy)
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

//2:-UPDATE STRATEGY ROUTE :-
router.put("/updateStrategy", async (req, res) => {
  try {
    const {
      strategyName,
      index,
      legs,
      entryTime,
      exitTime,
      overAllStopLoss,
      overAllTarget,
      profitReaches,
      trailStopLoss,
      user,
    } = req.body;

    // Find the strategy by ID
    let strategy = await Simplestrategy.findOne({ strategyName });
    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }

    // Update basic fields if they exist in the request body
    if (strategyName) strategy.strategyName = strategyName;
    if (index) strategy.index = index;
    if (entryTime) strategy.entryTime = entryTime;
    if (exitTime) strategy.exitTime = exitTime;
    if (overAllStopLoss !== undefined)
      strategy.overAllStopLoss = overAllStopLoss;
    if (overAllTarget !== undefined)
      strategy.overAllTarget = overAllTarget;
    if (profitReaches !== undefined)
      strategy.lockProfit.profitReaches = profitReaches;
    if (trailStopLoss !== undefined)
      strategy.trailStopLoss = trailStopLoss;

    // Handle updating legs (Add, Update, Remove)
    if (legs && legs.length > 0) {
      
      // Create a set of existing leg IDs for faster access
      const existingLegIds = new Set(strategy.legs.map(leg => leg.Id));

      // Iterate through legs and update or add
      legs.map(async(newLeg) => {

        if(existingLegIds.has(newLeg.Id)){   
          strategy.legs=legs;
        }
        else{
          strategy.legs.push(newLeg)
        }
        
      })
      // Remove legs where "remove" is true
      await strategy.save();

  // Filter the new legs and assign them to strategy.legs
  const existingLegIds1 = new Set(strategy.legs.map(leg => leg.Id));
  strategy.legs = legs.filter((newLeg) => {
    // Agar leg existing hai aur remove true hai, to usse remove karo
    if (existingLegIds1.has(newLeg.Id) && newLeg.remove === true) {
      return false; // Is leg ko remove karo
    }
    return true; // Is leg ko rakh do
  });
      

    }

    // Save the updated strategy
    await strategy.save();

    res
      .status(200)
      .json({ message: "Strategy updated successfully", strategy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating strategy" });
  }
});

//3:-DELETE STRATEGY ROUTE:-
router.delete("/deleteStrategy", async (req, res) => {
  try {
    let { strategyName } = req.body;
    //take by jwttoken
    let userId = "6510c7a0f64a3b0021d45c11";

    if (!strategyName) {
      return sendResponse(
        res,
        400,
        "please Provide strategyname for delete the strategy",
        null,
        false
      );
    }

    let findStrategy = await Simplestrategy.findOneAndDelete({
      strategyName: strategyName,
      user: userId,
    });
    if (!findStrategy) {
      return sendResponse(
        res,
        404,
        "provided Strategy Not found!",
        findStrategy,
        false
      );
    }

    return sendResponse(
      res,
      200,
      "Strategy deleted succesfully",
      findStrategy,
      true
    );
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

// 4:- GET ALL STRATEGY OF A PARTICULAR USER:-

router.get("/getStrategy", async (req, res) => {
  try {
    //take by jwttoken
    let userId = "6510c7a0f64a3b0021d45c11";

    let findAllStrategy = await Simplestrategy.find({ user: userId });
    if (!findAllStrategy) {
      return sendResponse(res, 400, "No Strategy Found", null, false);
    }
    return sendResponse(
      res,
      200,
      "find all strategy succesfully",
      findAllStrategy,
      true
    );
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

// 5:- FIND A SINGLE STRATEGY:-
router.post("/getOneStrategy", async (req, res) => {
  try {
    let { strategyName } = req.body;
    if (!strategyName) {
      return sendResponse(res, 400, "strategyName is required", null, false);
    }
    let userId = "6510c7a0f64a3b0021d45c11";

    let findOneStrategy = await Simplestrategy.findOne({
      strategyName: strategyName,
      user: userId,
    });
    if (!findOneStrategy) {
      return sendResponse(res, 400, "No Strategy Found", null, false);
    }
    return sendResponse(
      res,
      200,
      "find one strategy succesfully",
      findOneStrategy,
      true
    );
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

router.post('/advance',async(req,res)=>{
  let findadvamce=await advance.find();
  return res.json(findadvamce)
})

module.exports = router;
