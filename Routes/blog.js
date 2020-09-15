const router = require('express').Router()
const { default: slugify } = require('slugify');
const myAuth= require('./authorize')
const  connection = require('../myconn')
const LoremIpsum = require("lorem-ipsum").LoremIpsum

router.get('/', (req, res) => {

 })
 
 
 router.get('/:slug', (req, res) => {
   let slug =  req.url.replace(/^\//, '')
   const query = `SELECT * FROM posts JOIN users ON posts.user_id = users.id WHERE slug ='${slug}' LIMIT 1`;
   console.log(query);
   connection.query(query, async (error, result, fields) => {
    if (result) 
     return res.status(201).send(result[0])
    else 
    return res.status(400).send("can't find the post")
   }) 
 })
 
  router.post('/',  (req, res) => {
   console.log(req.body)
   let {id, title, body, tags} = req.body
   slug=slugify(title)
   const sql = `INSERT INTO posts (user_id, slug, body, tags) VALUES (${id}, "${slug}","${body}", "${tags}")`;
   console.log(sql);
   connection.query(sql, async (error, result, fields) => {
    if (result) 
     return res.status(201).send("post added")
    else 
    return res.status(400).send("can't add post")
   })
  })

  router.post('/loremipsum', (req, res) => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });
    
    console.log(lorem)

   // const sql = "INSERT INTO posts (id, slug, body, tags) VALUES "
    let s =''
    for(let i = 0; i < 30; i++) {
      const title =lorem.generateWords(8)
      const slug = slugify(title)
      
      const tags = lorem.generateWords(6)
      const body =lorem.generateParagraphs(7)
      // ${id}, "${slug}","${body}", "${tags}"`;
      const sql = "INSERT INTO posts (user_id, title, slug, body, thumbnail, tags) VALUES (1," +  connection.escape(title) + "," + connection.escape(slug) + "," + connection.escape(body) + ", " +  "'http://lorempixel.com/400/400/'" + "," + connection.escape(tags) +")"
      connection.query(sql, async (error, result, fields) => {

       })
    }
    return res.status(200).send("YEAH")
  })
 

module.exports= router