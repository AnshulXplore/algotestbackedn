const sendResponse=require('../helper/helper')
function checkLegsCondition(res,e){
    try{
      console.log(e)
        if ((e.StrikeCriteria.StrikeCriteriaType === "Strike Type" && !e.StrikeCriteria.StrikeCriteriaValue) || 
            (e.StrikeCriteria.StrikeCriteriaType === "Strike type" && !e.StrikeCriteria.StrikeCriteriaValue)) {
          return sendResponse(res, 400, "please provide strike value", null, false);
        }
        if(e.StrikeCriteria.StrikeCriteriaType === "Closest Premium" && !e.StrikeCriteria.premiumvalue || e.StrikeCriteria.StrikeCriteriaType === "Closest Premium" && e.StrikeCriteria.premiumvalue<0 || e.StrikeCriteria.StrikeCriteriaType === "Premium <=" && !e.StrikeCriteria.premiumvalue || e.StrikeCriteria.StrikeCriteriaType === "Premium <=" && e.StrikeCriteria.premiumvalue<0 || e.StrikeCriteria.StrikeCriteriaType === "Premium >=" && !e.StrikeCriteria.premiumvalue || e.StrikeCriteria.StrikeCriteriaType === "Premium >=" && e.StrikeCriteria.premiumvalue<0){
          return sendResponse(res,400,"please provide premium value or in positive",null,false)
        }
        if(e.StrikeCriteria.StrikeCriteriaType === "premiumrange" && !e.StrikeCriteria.premiumrange ||e.StrikeCriteria.StrikeCriteriaType === "premiumrange" && e.StrikeCriteria.premiumrange.valueX>= e.StrikeCriteria.premiumrange.valueY){
          return sendResponse(res,400,"gratehr must be grteher than lower",null,false)
        }
        if(e.StrikeCriteria.StrikeCriteriaType === "atmStraddlepremium" && !e.StrikeCriteria.atmStraddlepremium || e.StrikeCriteria.StrikeCriteriaType === "atmStraddlepremium" && !e.StrikeCriteria.atmStraddlepremium.unit || e.StrikeCriteria.StrikeCriteriaType === "atmStraddlepremium" && !e.StrikeCriteria.atmStraddlepremium.value || e.StrikeCriteria.StrikeCriteriaType === "atmStraddlepremium" && e.StrikeCriteria.atmStraddlepremium.value<0){
          return sendResponse(res,400,"please provide atmStraddlepremium unit and value",null,false)
        }
        if(e.StrikeCriteria.StrikeCriteriaType === "straddleWidth" && !e.StrikeCriteria.straddleWidth.value || e.StrikeCriteria.StrikeCriteriaType === "straddleWidth" && e.StrikeCriteria.straddleWidth.value<0){
          return sendResponse(res,400,"please provide positive straddlewidth value",null,false)
        }
        if(e.targetProfit.enabled===true && !e.targetProfit.value  || e.targetProfit.enabled===true && e.targetProfit.value<0){
          return sendResponse(res,200,"please seletc positive number",null,false)
        }
        if(e.stopLoss.enabled===true && !e.stopLoss.value  || e.stopLoss.enabled===true && e.stopLoss.value<0){
          return sendResponse(res,200,"please seletc positive number",null,false)
        }
        if(e.trailStopLoss.enabled===true && !e.trailStopLoss.valueX || e.trailStopLoss.enabled===true && !e.trailStopLoss.valueY   || e.trailStopLoss.enabled===true && e.trailStopLoss.valueX<0 || e.trailStopLoss.enabled===true && e.trailStopLoss.valueY<0){
          return sendResponse(res,200,"please seletc positive number",null,false)
        }
        if(e.reEntryOntarget.enabled===true && e.reEntryOntarget.type==="lazy leg" && !e.reEntryOntarget.lazyLeg){
          return sendResponse(res,200,"Please select atleast one leg in reentryontarget",null,false)
        }
        if(e.reEntryOnSL.enabled===true && e.reEntryOnSL.type==="lazy leg" && !e.reEntryOnSL.lazyLeg){
          return sendResponse(res,200,"Please select atleast one leg in reentryonsl",null,false)
        }
        if(e.simpleMomentum){
        if(e.simpleMomentum.enabled===true && !e.simpleMomentum.value || e.simpleMomentum.enabled===true && e.simpleMomentum.value<0){
          return sendResponse(res,200,"please seletc positive number",null,false)
        }
        
      }
    
        if(e.rangebreakOut && e.rangebreakOut.enabled===true){
          const checkstartTime=isTimeOutsideRange(e.rangebreakOut.start);
          if(checkstartTime===true){
            return sendResponse(res,400,"please enter valid starttime time in rangebreakout",null,false)
          }
          const checkEndTime1=isTimeOutsideRange(e.rangebreakOut.end);
          if(checkEndTime1===true){
            return sendResponse(res,400,"please enter valid end time in rangebreakout",null,false)
          }
        }
      }catch(error){
        // return sendResponse(res,500,"internal server error",null,false)
      }
}


module.exports=checkLegsCondition;