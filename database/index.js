const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
var promise = mongoose.connect('mongodb://localhost/repoSchema', {
  useMongoClient: true,
});

promise.once('open', function(){
  console.log('Database - opened!')
});

let repoSchema = mongoose.Schema({
  username: String,
  reponame: String,
  repoURL: {type: 'string', unique: true},
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  var parsedData = JSON.parse(data);

  parsedData.forEach((repo) => {
    let mongoDocument = new Repo({
      username: repo.owner.login,
      reponame: repo.name,
      repoURL: repo.html_url
    });

    mongoDocument.save((err) => {
      if (err) {
        console.log('ERROR: ', err);
      } else {
        console.log('Document saved successfully!')
      }
    });
  })
}

module.exports.save = save;