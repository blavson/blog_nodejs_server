const router = require('express').Router()
const jwt = require('jsonwebtoken')
const  connection = require('../myconn')
const auth = require('./authorize')

router.get("/show/:id",  (req, res)=> {
  const query = `SELECT * FROM posts WHERE user_id = ${id}`
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

