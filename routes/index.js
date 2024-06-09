var express = require('express');
var router = express.Router();
var {Client} = require("pg");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const connectDb = async (request, response) => {
    try{
        const client = new Client({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: process.env.PGPORT,
          ssl: true
        })
        await client.connect()
        const result = await client.query('SELECT * FROM users')
        console.log("Result: ")
        for(let row of result.rows){
          console.log(JSON.stringify(row))
        }
        await client.end()
        res.render('index', { title: "google", users: result.rows });
    }catch(error){
      console.log(error)
    }
  }
  connectDb()
});

module.exports = router;