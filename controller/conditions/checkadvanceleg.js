const sendResponse=require('../helper/helper')
function isTimeOutsideRange(inputTime) {
        // Time boundarie
        const startTime = "09:30"; 
        const endTime = "15:30";   
      
        // Compare the input time with the boundaries
        if (inputTime < startTime || inputTime > endTime) {
          return true; // jab time outside range ho tba true
        }
        return false; // verna false
      }
      function checkString(param){
        return typeof param ==='string'
      }
function checkvalidation(strategy,res){
    if(!strategy.user){
        return sendResponse(res,400,"user is required",null,false);
    }
    if(!strategy.strategyName){
        return sendResponse(res,400,"strategyName is required",null,false);
    }
    if(!strategy.INDEX){
        return sendResponse(res,400,"strategyName is required",null,false);
    }
    if(!strategy.strategyType){
        console.log(strategy.strategyType)
        return sendResponse(res,400,"strategyType is required",null,false);
    }
    if(!strategy.entryTime){
        return sendResponse(res,400,"entryTime is required",null,false);
    }
    if(!strategy.exitTime){
        return sendResponse(res,400,"exitTime is required",null,false);
    }
    if(!strategy.backtest_startdate){
        return sendResponse(res,400,"backtest_startdate is required",null,false);
    }
    if(!strategy.backtest_endDate){
        return sendResponse(res,400,"backtest_endDate is required",null,false);
    }
    if(strategy.entryTime){
        const checkExitTime=isTimeOutsideRange(strategy.entryTime);
        if(checkExitTime===true){
            return sendResponse(res,400,"entryTime is not Valid",null,false);
        }
    }
    if(strategy.exitTime){
        const checkExitTime=isTimeOutsideRange(strategy.exitTime);
        if(checkExitTime===true){
            return sendResponse(res,400,"exitTime is not Valid",null,false);
        }
    }
    if(strategy.restrictReEntry &&checkString(strategy.restrictReEntry) && isTimeOutsideRange(strategy.restrictReEntry)){
        return sendResponse(res,400,"please provide a lots in valid time in restrictReEntry ",null,false)
    }

    for(const e of strategy.legs){
        if(!e.lots || e.lots<=0){
            return sendResponse(res,400,"please provide a lots in valid number",null,false)
        }
    }
         return sendResponse(res,200,"sucess",strategy,true)
 
}

module.exports=checkvalidation;