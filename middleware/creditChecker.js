const jwt = require('jsonwebtoken');
const {  ObjectId } = require('mongodb');  // OBJECCTiD
const sendResponse = require('../controller/helper/helper');  // RETURN FUNCTION
const creditChecker = async(req, res, next) => {
  try {
    let userId=req.userData.userId;
    const db = req.app.locals.db; 
    const User = db.collection('User');
    //FIND THE USER:-
    let finduser=await User.findOne({_id:new ObjectId(userId)})
    if(!finduser){
        return sendResponse(res,400,"user not found",null,false)
    }
    //AVAILABLE CREDOT SCORE:-
    let availableCredit=finduser.creditScore;
    if(availableCredit===0){
        return sendResponse(res,400,"please recharge credit",null,false)
    }
    next();
  } catch (error) {
    
  }
}
module.exports = creditChecker;
