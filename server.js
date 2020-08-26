const express = require('express')
const cors = require('cors')
const qs = require('qs')
const bodyParser = require('body-parser');
const mysql = require('mysql'); 
const { default: slugify } = require('slugify');
const url = require('url');
app = express()
const port = 8000


app.use(cors())
app.use(bodyParser.json());
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database : process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MYSQL server! "  + process.env.MYSQL_DB);
});

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/blog', (req, res) => {
 console.log(qs.parse(req.query));
  res.send('Blog get')
})

app.get('/blog/:slug', (req, res) => {
  let slug = req.url
  slug = slug.replace('/blog/', '')
  const query = `SELECT * FROM posts WHERE slug ='${slug}'`;
  con.query(query, (err, result, fields) => {
    if (err) throw err;
    res.send(result)
  });
})

app.post('/blog', (req, res) => {
  console.log(req.body)
  let {slug, body} = req.body
  slug=slugify(slug)
  const sql = `INSERT INTO posts (slug, body) VALUES ('${slug}','${body}')`;
  con.query(sql,  (err, result) => {
    if (err) throw err;
    console.log(sql);
  });
   res.send('Blog Post')
 })


 app.post('/user', (req, res) => {
  console.log(req.body)
})

app.get('/user', (req,res) => {
  const username = req.query.username;
  const sql = `SELECT * FROM users WHERE name like '${username}%'`
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result))
  })
})

app.listen(port , () => {
  console.log('listening to port ', port);
})