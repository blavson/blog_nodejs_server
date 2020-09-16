const router = require('express').Router()
const jwt = require('jsonwebtoken')
const  connection = require('../myconn')
const auth = require('./authorize')

router.get('/show/:id',  (req, res)=> {
  let id = req.params.id;
  const query = `SELECT * FROM posts  JOIN users on users.id = posts.user_id WHERE user_id = ${id} LIMIT 10`
  connection.query(query, async (error, results, fields) => {
    try {
         if (results.length === 0) {
         return res.status(400).send("Author doesn't exist") 
         }
        return  res.status(200).json({posts:results})
      } catch(error) {
        return res.send(error)
      }
    })  
})

module.exports= router

