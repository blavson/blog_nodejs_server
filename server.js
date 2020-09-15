const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const connection = require('./myconn')

const myAuth = require('./Routes/authorize')

app = express()
app.use(express.json())
app.use(cors({origin: true, credentials: true}));

const blogRoute = require('./Routes/blog')
const authRoute = require('./Routes/auth')
const myAuthor = require('./Routes/author')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
  });

const port = 8000

app.use(bodyParser.json());
app.use('/blog',  blogRoute)
app.use('/user', authRoute)
app.use('/author', myAuthor)

connection.connect( () => {
  console.log("Connected to MySQL ...")
})



app.get('/', (req, res) => {
  const query = "SELECT posts.*, users.name  FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC LIMIT 20"
  connection.query(query,  (error, results, fields) => {
    if (results) {
      console.log(results);
     return res.status(201).send(JSON.stringify(results))
    }
    else 
    return res.status(400).send("NO POSTS FOR NOW")
   })
 })

 app.get('/create', myAuth, (req, res) => {
  console.log("blog create")
   res.send('Blog create')
})

app.listen(port , () => {
  console.log('listening to port ', port);
})
