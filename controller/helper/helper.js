function sendResponse(res, statusCode, message,reasult,success) {
    return res.status(statusCode).json({ message,reasult,success});
  }
module.exports=sendResponse;  