const router = require('express').Router()
const jwt = require('jsonwebtoken')
const  connection = require('../myconn')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup',  async(req, res) => {
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

      return res.sendStatus(200).send("Signed up")

  } catch(err) {
    console.log(err);
  }
})

  router.post('/login', async(req, res) => {
    let { email, password} = req.body
    query = "SELECT * FROM users WHERE email =" + connection.escape(email);
    connection.query(query, async (error, results, fields) => {
    try {  
        if (!results) 
          res.sendStatus(401).send("email or password doesn't match") 
        const match = await bcrypt.compare(password, results[0].password)
        if (!match) 
           res.sendStatus(402).send("password doesn't match") 
         const _id = await results[0].id
         const token =  jwt.sign({ email : email }, 'whatever');
        return  res.header('Authorization','Bearer ' +  token).send({_id, token})
    } catch (error) {
        console.log(error)
         res.sendStatus(407).send("Wrong email or password")
    }     
    })
  })




router.get('/home',  (req, res) => {
  jwt.verify(req.token, 'whatever', (err, data) => {
      if (err) {
        res.send.status(403)
  } else {
      res.send(data)
  }
  })
})
module.exports=router 