var express = require('express');
var router = express.Router();
var {Client} = require("pg");

var i = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const connectDb = async () => {
    try{
        const client = new Client({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: process.env.PGPORT
        })
        await client.connect()
        const res = await client.query('SELECT * FROM users')
        console.log(res)
        await client.end()
    }catch(error){
      console.log(error)
    }
  }

  res.render('index', {title: "google"});
});

module.exports = router;