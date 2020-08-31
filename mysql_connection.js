const mysql = require('mysql')
const wrapper = require('node-mysql-wrapper')

require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database : process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD
});


 const db = wrapper.wrap(con)

 db.ready(async () =>{
 })

module.exports=db