const router = require('express').Router()
const { default: slugify } = require('slugify');
const myAuth= require('./authorize')

router.get('/', (req, res) => {
  console.log("All blogs")
   res.send('All blogs')
 })

 router.get('/create', myAuth, (req, res) => {
  console.log("blog create")
   res.send('Blog create')
 })
 
 
 router.get('/:slug', (req, res) => {
   let slug = req.url
   slug = slug.replace('/blog/', '')
   const query = `SELECT * FROM posts WHERE slug ='${slug}'`;
 })
 
  router.post('/', myAuth, (req, res) => {
   console.log(req.body)
   let {title, body, tags} = req.body
   slug=slugify(title)
   const sql = `INSERT INTO posts (id, slug, body, tags) VALUES (1, "${slug}","${body}", "${tags}")`;

  })
 

module.exports= router