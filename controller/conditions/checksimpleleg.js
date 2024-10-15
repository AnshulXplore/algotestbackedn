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
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Convert all times to minutes for accurate comparison
  const inputMinutes = timeToMinutes(inputTime);
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // Compare the input time with the range
  return inputMinutes < startMinutes || inputMinutes > endMinutes;
}
function checkString(param) {
  return typeof param === "string";
}
function checkvalidation(strategy) {
  if (!strategy.index) {
    return { isValid: false, message: "index is required!" };
  }
  if (!strategy.entryTime) {
    return { isValid: false, message: "entryTime is required!" };
  }
  if (!strategy.exitTime) {
    return { isValid: false, message: "exitTime is required!" };
  }
  if (!strategy.user) {
    return { isValid: false, message: "User is required!" };
  }
  if(isTimeOutsideRange(strategy.entryTime)){
    return { isValid: false, message: "entryTime range is not valid!" }; 
  }
  if(isTimeOutsideRange(strategy.exitTime)){
    return { isValid: false, message: "exitTime range is not valid!" }; 
  }
  if(!strategy.legs) return { isValid: false, message: "atleast one legs is required" };

  for (const e of strategy.legs) {
    if (!e.lots || e.lots <= 0)
      return {isValid: false,message: "please provide a valid number of lots!"};
    if (!e.segment) {
      return { isValid: false, message: "Segment is required!" };
    }
  }

  return { isValid: true };
}

module.exports=checkvalidation;
