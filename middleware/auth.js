var jwt = require('jsonwebtoken')
const userModel=require('../models/User.js')


var checkUserAuth = async (req, res, next) => {
    const { token }  = req.cookies;
  
    if (!token) {
      res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
    }else{
    const decodedData = jwt.verify(token,  process.env.JWT_SECRET_KEY);
    //console.log(decodedData)
  
    req.user = await userModel.findById(decodedData.userid);
    //console.log(req.user.id)
    next()
}
}

module.exports = checkUserAuth;

