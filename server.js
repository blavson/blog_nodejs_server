const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./mysql_connection')

const url = require('url');

app = express()


const port = 8000


const blogRoute = require('./Routes/blog')
const authRoute = require('./Routes/auth')

app.use(cors())
app.use(bodyParser.json());



app.use('/', blogRoute)
app.use('/user', authRoute)





app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port , () => {
  console.log('listening to port ', port);
})
