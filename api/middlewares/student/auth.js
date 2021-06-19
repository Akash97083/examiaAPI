const jwt = require('jsonwebtoken')
module.exports = function (req,res,next){
const token = req.header('x-auth-token');
if(!token)
    return res.status(401).send("Access Denied")
try{
    const decodeToken = jwt.verify(token,'studentKey')
    req.student = decodeToken
    next()
}catch (e) {
    return res.status(401).send("Wrong Token")
}
}
