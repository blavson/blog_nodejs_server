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

connection.connect( () => {
  console.log("Connected to MySQL ...")
})



app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port , () => {
  console.log('listening to port ', port);
})
