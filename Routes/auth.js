const router = require('express').Router()
const jwt = require('jsonwebtoken')
const  connection = require('../myconn')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup',  async (req, res) => {
  let { username , email, password} = req.body;
  let sql = "SELECT  name FROM users WHERE name =" + connection.escape(username);
  try {
  connection.query(sql, async (error, result, fields) => {
   if (error) throw(error)
      console.log(result)
      if (result.length  > 0 ) {
        return res.status(402).send("User exists");
      }
  })  

   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password, salt);
   const token =  jwt.sign({ email : email }, 'whatever');
   sql = "INSERT INTO users VALUES(0, " + connection.escape(username) +"," 
                                                      + connection.escape(email) + ","
                                                      + "NOW(), " + connection.escape(hash) + ","
                                                      + "NOW(), NOW(), 1," +  connection.escape(token) + ")";
   connection.query(sql,   async (error, result, fields) => {
    if (error) throw error
     return res.header('Authorization','Bearer ' +  token).status(201).json({token : token, _id : result.insertId })
    })
   // return  res.setHeader('Authorization','Bearer ' +  token).send(token);
    
} catch(err) {
  console.log(err)
}
})



  router.post('/login', async(req, res) => {
    let { email, password} = req.body
    query = "SELECT * FROM users WHERE email =" + connection.escape(email)
    connection.query(query, async (error, results, fields) => {
    try {
         if (results.length === 0) {
         return res.status(400).send("email  doesn't match") 
         }
         const match = await bcrypt.compare(password, results[0].password)
         if (!match) 
           return  res.status(400).send("password doesn't match") 
        return  res.status(200).json({token:results[0].remember_token, _id : results[0].id})
      } catch(error) {
        return res.send(error)
      }
    })
  })

router.post('/logout', async(req, res) => {

})


router.post('/secure/verify',  async (req, res) => {
   jwt.verify(req.body.token, 'whatever', (err, data) => {
      if (err) {
        console.log("Checking token failed")
        res.status(403).send("invalid token")
  } else {
      console.log(data)
      res.status(200).send(data)
  }
  })
})
module.exports=router 