// strategyRoutes.js
const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const creditChecker = require("../../middleware/creditChecker");
const {createSimpleStrategy,updateSimpleStrategy,deleteSimpleStrategy,getSimpleStrategies,getOneSimpleStrategy,changePrivacy} = require('../strategy/simplestrategyController');
router.post("/createSimpleStrategy", fetchUser, creditChecker, createSimpleStrategy);
router.put("/updateSimpleStrategy", fetchUser, creditChecker, updateSimpleStrategy);
router.delete("/deleteSimpleStrategy", fetchUser, creditChecker, deleteSimpleStrategy);
router.get("/getSimpleStrategies", fetchUser, getSimpleStrategies);
router.post("/getOneSimpleStrategy", fetchUser, getOneSimpleStrategy);
router.post("/changeSimpleStrategyPrivacy", fetchUser,creditChecker, changePrivacy);
module.exports = router;
