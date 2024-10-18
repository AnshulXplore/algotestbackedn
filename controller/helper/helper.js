// THIS IS THE HELPING FUNCTION FOR RETURN STATEMENT IN SAME FORMAT IN WHOLE APPLICATION :-
function sendResponse(res, statusCode, message,reasult,success) {
     res.status(statusCode).json({ message,reasult,success});
  }
module.exports=sendResponse;  