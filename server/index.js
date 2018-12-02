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
  console.log('Request body -->', req.body);
  getRepos.getReposByUsername(req.body.username, function(body) {
    console.log('getReposByUsername function was called');
    //console.log('results -->', JSON.parse(body));
    //mongo.find(body).then((result) => (console.log('Result array -->', result)));
    mongo.save(body);
  })
  res.status(201).send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

