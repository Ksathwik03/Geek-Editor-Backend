const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.verifyUser = async(req,res,next) => {
  const token = req.header('Authorization').replace('Bearer ','')
  if(!token){
    return res.status(403).json({
      success: false,
      error: "Token is required"
    })
  }
  const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      });
    }
    try {
      const decoded = jwt.verify(token, "secret_key")
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user =user
    } catch (err) {
      return res.status(404).json({
        success: false,
        error: 'Wrong token',
        details:err
      });
    }
    next();
}
