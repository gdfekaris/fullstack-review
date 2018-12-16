const express = require('express');
const mongo = require('../database');
const getRepos = require('../helpers/github.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

console.log('mongo', mongo);

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getRepos.getReposByUsername(req.body.username, function(body) {
    console.log('getReposByUsername function was called');
    mongo.save(body);
  })
  res.status(201).send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET request fired');
  mongo.find((data) => { res.send(data) });
  //console.log(repos);


  //res.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

