// // advance leg setup

// const {
//     strategyName,
//     instrumentSetting,
//     entrySetting,
//     legWiseSetting,
//     delayedLegs,
//     legs,
//     user,
//     overAllStrategySetting
//   } = req.body;
//   // console.log(req.body)
//   function isTimeOutsideRange(inputTime) {
//     // Time boundarie
//     const startTime = "09:30"; 
//     const endTime = "15:30";   
  
//     // Compare the input time with the boundaries
//     if (inputTime < startTime || inputTime > endTime) {
//       return true; // jab time outside range ho tba true
//     }
//     return false; // verna false
//   }
  
//   // check the entry time of entry section 
//   const checkEntryTime=isTimeOutsideRange(entrySetting.entryTime);
//   if(checkEntryTime===true){
//     return sendResponse(res,400,"please enter valid entry  time",null,false)
//   }
//   //check the exit time of enterysection setting
//   const checkExitTime=isTimeOutsideRange(entrySetting.exitTime);
//   if(checkExitTime===true){
//     return sendResponse(res,400,"please enter valid exit time",null,false)
//   }
  
//   // Validate required fields
//   if (!strategyName) {
//     return res.status(400).json({ error: "strategyName is required." });
//   }
//   if (!instrumentSetting || !instrumentSetting.Ticker) {
//     return res.status(400).json({ error: "Ticker and Underlyingfrom are required in instrumentSetting." });
//   }
//   if (!entrySetting || !entrySetting.strategyType || !entrySetting.entryTime || !entrySetting.exitTime) {
//     return res.status(400).json({ error: "strategyType, entryTime, and exitTime are required in entrySetting." });
//   }
  
//   if(entrySetting.strategyType==="Intraday" && entrySetting.restrictReEntry.enabled===true && !entrySetting.restrictReEntry.value || isTimeOutsideRange(entrySetting.restrictReEntry.value)===true && entrySetting.restrictReEntry.enabled===true && entrySetting.strategyType==="Intraday"){
//     return sendResponse(res,400,"Please provide market hour time",null,false)
//   }
//   if (!legWiseSetting || !legWiseSetting.squareOff) {
//     return res.status(400).json({ error: "squareOff is required in legWiseSetting." });
//   }
//   if (!legs || !Array.isArray(legs) || legs.length === 0) {
//     return res.status(400).json({ error: "At least one leg is required." });
//   }
   
//   // this is the overallsetting validation
//   if(!overAllStrategySetting){
//      return sendResponse(res,400,"please provide overAllStrategySetting",null,false)
//   }
//   // if overallSL is not valid in overallsetting
//   if(overAllStrategySetting.overallSL.enabled===true && overAllStrategySetting.overallSL.value<=0 || overAllStrategySetting.overallSL.enabled===true && !overAllStrategySetting.overallSL.value){
//     return sendResponse(res,400,"please enter must be a positive number in overallsl",null,false)
//   }
//   // if overallTarget is not valid in overallsetting
//   if(overAllStrategySetting.overallTarget.enabled===true && overAllStrategySetting.overallTarget.value<=0 || overAllStrategySetting.overallTarget.enabled===true && !overAllStrategySetting.overallTarget.value){
//     return sendResponse(res,400,"please enter must be a positive number in overfalltarget",null,false)
//   }
//   // if overallReEntrySL is not valid in overallsetting
//   if(overAllStrategySetting.overallReEntrySL.enabled===true && overAllStrategySetting.overallReEntrySL.value<=0 || overAllStrategySetting.overallReEntrySL.enabled===true && !overAllStrategySetting.overallReEntrySL.value){
//     return sendResponse(res,400,"please enter must be a positive number in overallreentrysl",null,false)
//   }
//   // if overallReEntryTarget is not valid in overallsetting
//   if(overAllStrategySetting.overallReEntryTarget.enabled===true &&  overAllStrategySetting.overallReEntryTarget.value<=0 || overAllStrategySetting.overallReEntryTarget.enabled===true && !overAllStrategySetting.overallReEntryTarget.value){
//     return sendResponse(res,400,"please enter must be a positive number in overallreentryontarget",null,false)
//   }
//   // this validation for the :-
//   if(overAllStrategySetting.trailingOption.enabled===true && overAllStrategySetting.trailingOption.Lock && overAllStrategySetting.trailingOption.Lock.profitAcheive<=0 || overAllStrategySetting.trailingOption.enabled===true && overAllStrategySetting.trailingOption.Lock &&overAllStrategySetting.trailingOption.Lock.lockProfit<=0){
//     return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//   }

//   if(overAllStrategySetting.trailingOption.enabled===true && overAllStrategySetting.trailingOption.lockAndTrail){
//     if(!overAllStrategySetting.trailingOption.lockAndTrail.profitAcheive || overAllStrategySetting.trailingOption.lockAndTrail.profitAcheive<=0){
//     return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//     }
//     if(!overAllStrategySetting.trailingOption.lockAndTrail.lockProfit || overAllStrategySetting.trailingOption.lockAndTrail.lockProfit<=0){
//       return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//     }
//       if(!overAllStrategySetting.trailingOption.lockAndTrail.profitIncrease || overAllStrategySetting.trailingOption.lockAndTrail.profitIncrease<=0){
//         return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//       }
//       if(!overAllStrategySetting.trailingOption.lockAndTrail.trailProfitBy || overAllStrategySetting.trailingOption.lockAndTrail.trailProfitBy<=0){
//         return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//       }
//   }
//   if(overAllStrategySetting.trailingOption.enabled===true && overAllStrategySetting.trailingOption.overAllTrailSl){
//     if(!overAllStrategySetting.trailingOption.overAllTrailSl.value1 || overAllStrategySetting.trailingOption.overAllTrailSl.value1<=0){
//     return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//     }
//     if(!overAllStrategySetting.trailingOption.overAllTrailSl.value2 || overAllStrategySetting.trailingOption.overAllTrailSl.value2<=0){
//       return sendResponse(res,400,"please enter must be a positive number in trailing option",null,false)
//     }
//   }
//   if (!user) {
//     return res.status(400).json({ error: "User ID is required." });
//   }

//   // Check legs validation
//   for (const e of legs) {
//     checkLegsValidation(res,e)
//   }
//   // delayd legs validation if present in body
//   if(delayedLegs){
//     const delayedLegscheck=Object.values(delayedLegs)
//     for(const e of delayedLegscheck){
//       // checkdelayedlegs(res,e)
//     }
//   }
  

//   try {
//     const newStrategy = new Advancestrategy({
//       strategyName,
//       instrumentSetting,
//       entrySetting,
//       legWiseSetting,
//       delayedLegs: delayedLegs ? delayedLegs : {},
//       legs,
//       user,
//       overAllStrategySetting
//     });

//     // Save to database
//     await newStrategy.save();
//     return sendResponse(res,200,"succesfully save data",newStrategy,true)
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create advance strategy.", details: error.message });
//   }