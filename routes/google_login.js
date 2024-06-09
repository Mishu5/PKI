const { google } = require('googleapis');
const express = require('express')
const OAuth2Data = require('./google_key.json');
const { use } = require('./google_login');
const router  = express.Router();


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

router.get('/', (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
        });
        console.log(url)
        res.redirect(url);
    } else {
        var oauth2 = google.oauth2({auth: oAuth2Client, version: 'v2'})
        oauth2.userinfo.v2.me.get(function(err,result){
          if(err)
            {
                console.log('Niestety Blad!!')
                console.log(err)
            }
            else{
                loggedUser = result.data.name

                const addUser = async (user) => {
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
                        const result = await client.query('SELECT * FROM users WHERE name = $1', user)
                        if(result.rows.length === 0){
                            const currentDate = new Date();
                            const result = await client.query('INSERT INTO users (name, joined, lastvisited) VALUES ($1, $2, $3)', user, currentDate, currentDate)
                        }else{
                            const currentDate = new Date();
                            const result = await client.query('UPDATE users SET lastvisited = $1 WHERE name = $2', currentDate, user)
                        }
                        for(let row of result.rows){
                          console.log(JSON.stringify(row))
                        }
                        await client.end()
                        res.render('index', { title: "google", users: result.rows });
                    }catch(error){
                      console.log(error)
                    }
                }
                addUser(loggedUser)
                console.log(loggedUser)
            }
            res.render('google', {name: loggedUser, pic: result.data.picture})
        })
    }
})

router.get('/auth/google/callback', function (req, res) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/google')
            }
        });
    }
});

router.get('/logout', function(req, res){
    oAuth2Client.revokeCredentials(function(err, result) {
        if (err) {
            console.error('Error revoking credentials:', err);
        } else {
            console.log('Credentials revoked successfully.');
            // Reset authentication status
            authed = false;
            // Redirect to home page or any other desired destination
            res.redirect('https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://127.0.0.1:3000/');
        }
    });
});
module.exports = router