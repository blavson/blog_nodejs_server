const mysql = require('mysql')

require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database : process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD
});



module.exports=connection