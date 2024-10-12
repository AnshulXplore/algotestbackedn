function sendResponse(res, statusCode, message,reasult,success) {
     res.status(statusCode).json({ message,reasult,success});
  }
module.exports=sendResponse;  