const router = require('express').Router()
const jwt = require('jsonwebtoken')
const  db = require('../mysql_connection')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup',   async(req, res) => {
  let { username , email, password} = req.body;
  //const sql = "SELECT  name FROM users WHERE name ='" + username +"'";
    const result = await db.table("users").findSingle({name:username})

    if (typeof result !== 'undefined') {
      return res.status(400).send("User exists");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const new_user = { name : username, email, password: hash}
    const rslt = await db.table("users").save(new_user) 
    if (rslt) {
      const token =  jwt.sign({ email }, 'whatever');
      return res.status(201).send({email, token})
    } else {
      return res.status(500).send("Database Error")
    }
  })
    //if (result.length === 0) {
      // const sql1 = `INSERT INTO users values(0, '${username}', '${email}', NULL, PASSWORD('${password}'), NULL, NOW(), NOW())`;
      // con.query(sql1, (err, result) => {
      //   if (err) throw err;
      //   const token =  jwt.sign({ username, email }, 'whatever');
      //   res.status(201).send({
      //     success : true,
      //     email :email,
      //     token : token
      //   })
      // })
   
      
  //  }

verifyToken = (req, res, next)=> {
  const bearerHeader = req.headers['authorization']
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