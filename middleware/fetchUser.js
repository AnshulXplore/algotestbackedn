const jwt = require('jsonwebtoken');

const authuser = (req, res, next) => {
  const token = req.header('auth-token'); // ye auth-token header ka namke hai aapm apne accoriding bh rakh sakte ho
  if (!token) {
    return res.status(401).json('Invalid token, access denied, code 401');
  }
  const JWT_SECRET = "anshul";
  try {
    const tokenVerify = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', tokenVerify);  // Debug lo
    req.userData = tokenVerify;    
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json(error);
  }
};

module.exports = authuser;
