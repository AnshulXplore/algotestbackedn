const sendResponse=require('../helper/helper')
function checkdelayedlegs(res,e){
    try {
        console.log(e)
                // Strike Criteria validation
        if ((e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "Strike Type" && !e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaValue) || 
            (e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "Strike type" && !e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaValue)) {
          return sendResponse(res, 400, "please provide strike value", null, false);
        }
  
        // Premium validation
        if (e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "Closest Premium" && !e.delayedLegsStrikeCriteria.delayedLegspremiumvalue || e.delayedLegsStrikeCriteria.delayedLegspremiumvalue < 0 ||
            e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "Premium <=" && !e.delayedLegsStrikeCriteria.delayedLegspremiumvalue || e.delayedLegsStrikeCriteria.delayedLegspremiumvalue < 0 ||
            e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "Premium >=" && !e.delayedLegsStrikeCriteria.delayedLegspremiumvalue || e.delayedLegsStrikeCriteria.delayedLegspremiumvalue < 0) {
          return sendResponse(res, 400, "please provide premium value or in positive", null, false);
        }
  
        // Premium range validation
        if (e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "premiumrange" && !e.delayedLegsStrikeCriteria.delayedLegspremiumrange ||e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "premiumrange" &&  e.delayedLegsStrikeCriteria.delayedLegspremiumrange.delayedLegsvalueX >= e.delayedLegsStrikeCriteria.delayedLegspremiumrange.delayedLegsvalueY ||e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "premiumrange" && e.delayedLegsStrikeCriteria.delayedLegspremiumrange.delayedLegsvalueX<=0 ||e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "premiumrange" && e.delayedLegsStrikeCriteria.delayedLegspremiumrange.delayedLegsvalueY<=0) {
          return sendResponse(res, 400, "greater must be greater than lower", null, false);
        }
  
        // ATM Straddle premium validation
        if(e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "atmStraddlepremium" && !e.delayedLegsStrikeCriteria.delayedLegsatmStraddlepremium || e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "atmStraddlepremium" && !e.StrikeCriteria.delayedLegsatmStraddlepremium.delayedLegsunit || e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "atmStraddlepremium" && !e.StrikeCriteria.delayedLegsatmStraddlepremium.delayedLegsvalue || e.delayedLegsStrikeCriteria.delayedLegsStrikeCriteriaType === "atmStraddlepremium" && e.StrikeCriteria.delayedLegsatmStraddlepremium.delayedLegsvalue<0){
          return sendResponse(res,400,"please provide atmStraddlepremium unit and value",null,false)
        }
  
        // // Straddle width validation
        // if (e.StrikeCriteria.StrikeCriteriaType === "straddleWidth" && (!e.StrikeCriteria.straddleWidth.value || e.StrikeCriteria.straddleWidth.value < 0)) {
        //   return sendResponse(res, 400, "please provide positive straddlewidth value", null, false);
        // }
  
        // // Target profit validation
        // if (e.targetProfit.enabled === true && (!e.targetProfit.value || e.targetProfit.value < 0)) {
        //   return sendResponse(res, 400, "please select positive target profit value", null, false);
        // }
  
        // // Stop loss validation
        // if (e.stopLoss.enabled === true && (!e.stopLoss.value || e.stopLoss.value < 0)) {
        //   return sendResponse(res, 400, "please select positive stop loss value", null, false);
        // }
  
        // // Trail stop loss validation
        // if (e.trailStopLoss.enabled === true && (!e.trailStopLoss.valueX || !e.trailStopLoss.valueY || e.trailStopLoss.valueX < 0 || e.trailStopLoss.valueY < 0)) {
        //   return sendResponse(res, 400, "please select positive trail stop loss values", null, false);
        // }
  
        // // Re-entry on target validation
        // if (e.reEntryOntarget.enabled === true && e.reEntryOntarget.type === "lazy leg" && !e.reEntryOntarget.lazyLeg) {
        //   return sendResponse(res, 400, "Please select at least one leg in re-entry on target", null, false);
        // }
  
        // // Re-entry on stop loss validation
        // if (e.reEntryOnSL.enabled === true && e.reEntryOnSL.type === "lazy leg" && !e.reEntryOnSL.lazyLeg) {
        //   return sendResponse(res, 400, "Please select at least one leg in re-entry on stop loss", null, false);
        // }
  
        // // Simple Momentum validation
        // if (e.simpleMomentum && e.simpleMomentum.enabled === true && (!e.simpleMomentum.value || e.simpleMomentum.value < 0)) {
        //   return sendResponse(res, 400, "please select positive simple momentum value", null, false);
        // }
  
        // // Range Breakout validation
        // if (e.rangebreakOut && e.rangebreakOut.enabled === true) {
        //   const checkstartTime = isTimeOutsideRange(e.rangebreakOut.start);
        //   if (checkstartTime === true) {
        //     return sendResponse(res, 400, "please enter valid start time in range breakout", null, false);
        //   }
  
        //   const checkEndTime1 = isTimeOutsideRange(e.rangebreakOut.end);
        //   if (checkEndTime1 === true) {
        //     return sendResponse(res, 400, "please enter valid end time in range breakout", null, false);
        //   }
        // }
  
      } catch (error) {
        // return sendResponse(res, 500, error.message, null, false);
      }
}
module.exports=checkdelayedlegs;