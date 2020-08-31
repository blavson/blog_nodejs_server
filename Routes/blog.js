const router = require('express').Router()
const { default: slugify } = require('slugify');
const verifyToken= require('./auth')
const  {runQuery} = require('../mysql_connection')

router.get('/', (req, res) => {
   res.send('Blog get')
 })
 
 router.get('/:slug', (req, res) => {
   let slug = req.url
   slug = slug.replace('/blog/', '')
   const query = `SELECT * FROM posts WHERE slug ='${slug}'`;
    runQuery(query,(err, result) => {
      
    })
 })
 
  app.post('/', verifyToken, (req, res) => {
   console.log(req.body)
   let {title, body, tags} = req.body
   slug=slugify(title)
   const sql = `INSERT INTO posts (id, slug, body, tags) VALUES (1, "${slug}","${body}", "${tags}")`;
   runQuery(sql, (err, result)=> {

   })
/*   
   con.query(sql,  (err, result) => {
     if (err)  {
         res.status(500).send('error')
         console.dir(err)
     }
       else  {}
         res.status(201).send('success')
   });
   */
  })
 

module.exports= router