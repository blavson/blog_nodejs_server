const router = require('express').Router()
const jwt = require('jsonwebtoken')
const  connection = require('../myconn')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup',   async(req, res) => {
  let { username , email, password} = req.body;
  const sql = "SELECT  name FROM users WHERE name =" + connection.escape(username);
   connection.query(sql, (error, result, fields) => {
    if (error) 
      return res.status(400).send("DB Problem");
    console.log(result)
    if (result.length  > 0 ) {
      return res.status(400).send("User exists");
    }
  })  
  
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const sql = "INSERT INTO users VALUES(0, " + connection.escape(username) +"," 
                                                 + connection.escape(email) + ","
                                                 + "NOW(), " + connection.escape(hash) + ","
                                                 + "NULL, NOW(), NOW())";
      connection.query(sql, (error, result, fields) => {
        if (error) throw(error);
        console.log(result)
      })                            
      const token = jwt.sign({ email : email }, 'whatever');
      console.log(token);
      return res.status(200).send(token)

  } catch(err) {
    console.log(err);
  }
})

  router.post('/login', async(req, res) => {
    let { email, password} = req.body
    query = "SELECT email FROM users WHERE email =" + connection.escape(email);
    connection.query(query, async (error, user, fields) => {
      if (!user) 
      return res.status(400).send("Username or password doesn't match")  
          const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).send("Wrong username or password")
    }
    return res.status(200).send("success")
    })
    
  })

verifyToken = (req, res, next)=> {
  const bearerHeader = req.headers['Authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken =  bearer[1]
    req.token = bearerToken
    next()
  }
  else {
    res.status(403).send("Now way")
  }
}


router.get('/home', verifyToken , (req, res) => {
  jwt.verify(req.token, 'whatever', (err, data) => {
      if (err) {
        res.send.status(403)
  } else {
      res.send(data)
  }
  })
})
module.exports=  router , verifyToken 