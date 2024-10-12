const express = require("express");
const router = express.Router();
const SimpleLegs = require("../../schema/legBuilder"); // Schema ko import karen
const sendResponse = require('../helper/helper'); // Aapka helper function

router.post("/createLeg", async (req, res) => {
  const {
    segment,
    lots,
    Position,
    optionType,
    strikeCriteria,
    strikeType,
    targetProfit,
    stopLoss,
    trailStopLoss,
    
  } = req.body;

  // Validate required fields
  if (!segment || !Position || !user) {
    return sendResponse(res, 400, "Missing required fields", null, false);
  }

  // If segment is 'future', then do not require these fields
  if (segment === "future") {
    // Don't require optionType, strikeCriteria, strikeType, or Expiry
  } else {
    // For other segments, validate the required fields
    const { Expiry } = req.body; // Extract Expiry for validation
    if (!Expiry || !optionType || !strikeCriteria || !strikeType) {
      return sendResponse(res, 400, "Missing required fields for non-future segments", null, false);
    }
  }

  // Check targetProfit if enabled
  if (targetProfit && targetProfit.enabled) {
    if (targetProfit.value === 0) {
      return sendResponse(res, 400, "Target profit values cannot be 0 if enabled", null, false);
    }
  }

  // Check stopLoss if enabled
  if (stopLoss && stopLoss.enabled) {
    if (stopLoss.value === 0) {
      return sendResponse(res, 400, "Stop loss values cannot be 0 if enabled", null, false);
    }
  }

  // Check trailStopLoss if enabled
  if (trailStopLoss && trailStopLoss.enabled) {
    if (trailStopLoss.valueX === 0 || trailStopLoss.valueY === 0) {
      return sendResponse(res, 400, "Trail stop loss values cannot be 0 if enabled", null, false);
    }
  }

  // Create new leg entry
  try {
    const newLeg = new SimpleLegs({
      segment,
      Expiry: segment === "future" ? undefined : req.body.Expiry, // Only set Expiry if not future
      lots: lots || 1, // Default to 1 if not provided
      Position,
      optionType: segment === "future" ? undefined : optionType, // Only set if not future
      strikeCriteria: segment === "future" ? undefined : strikeCriteria, // Only set if not future
      strikeType: segment === "future" ? undefined : strikeType, // Only set if not future
      targetProfit: targetProfit || { enabled: false, value: null, unit: "PTS" },
      stopLoss: stopLoss || { enabled: false, value: null, unit: "PTS" },
      trailStopLoss: trailStopLoss || { enabled: false, valueX: null, valueY: null, unit: "PTS" },
      user,
    });

    await newLeg.save();
    return sendResponse(res, 200, "Leg created successfully", newLeg, true);
  } catch (error) {
    return sendResponse(res, 500, error.message, null, false);
  }
});

module.exports = router;
