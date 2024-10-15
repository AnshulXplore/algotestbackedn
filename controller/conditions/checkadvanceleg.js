const sendResponse=require('../helper/helper')
function isTimeOutsideRange(inputTime) {
    const startTime = "09:30";
    const endTime = "15:30";
  
    // Validate if inputTime matches the correct time format (HH:MM)
    const isValidTimeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/.test(inputTime);
    if (!isValidTimeFormat) {
      throw new Error("Invalid time format! Please use 'HH:MM'.");
    }
  
    // Helper function to convert HH:MM time string into minutes
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    // Convert all times to minutes for accurate comparison
    const inputMinutes = timeToMinutes(inputTime);
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
  
    // Compare the input time with the range
    return inputMinutes < startMinutes || inputMinutes > endMinutes;
  }
      function checkString(param){
        return typeof param ==='string'
      }
      function checkvalidation(strategy) {
        if (!strategy.user) return { isValid: false, message: "user is required" };
        if (!strategy.strategyName) return { isValid: false, message: "strategyName is required" };
        if (!strategy.index) return { isValid: false, message: "INDEX is required" };
        if (!strategy.strategyType) return { isValid: false, message: "strategyType is required" };
        if (!strategy.entryTime) return { isValid: false, message: "entryTime is required" };
        if (!strategy.exitTime) return { isValid: false, message: "exitTime is required" };
        if (!strategy.backtest_startdate) return { isValid: false, message: "backtest_startdate is required" };
        if (!strategy.backtest_endDate) return { isValid: false, message: "backtest_endDate is required" };
        if(!strategy.legs) return { isValid: false, message: "atleast one legs is required" };
    
        if (isTimeOutsideRange(strategy.entryTime)) 
            return { isValid: false, message: "entryTime is not Valid" };
        
        if (isTimeOutsideRange(strategy.exitTime)) 
            return { isValid: false, message: "exitTime is not Valid" };
    
        if (strategy.restrictReEntry && 
            checkString(strategy.restrictReEntry) && 
            isTimeOutsideRange(strategy.restrictReEntry)) 
            return { isValid: false, message: "restrictReEntry is not in valid time" };
    
        for (const e of strategy.legs) {
            if (!e.lots || e.lots <= 0) 
                return { isValid: false, message: "please provide a valid number of lots" };
        }
    
        return { isValid: true };
    }
    

module.exports=checkvalidation;