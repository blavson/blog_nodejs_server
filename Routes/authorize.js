const jwt = require('jsonwebtoken')

module.exports = function myAuth(req, res, next) {
  const bearerHeader = req.headers['authorization']
  console.log("Middlware runs", bearerHeader);
  if (!bearerHeader) 
    return res.status(401).send("Access Denied")
    try {
      const bearer = bearerHeader.split(' ')
      const bearerToken =  bearer[1]
      const verified=  jwt.verify(bearerToken, 'whatever' )
      req.user = verified
      next()
    }catch(error) {
      return res.status(401).send("Invalid Token")
    }
}