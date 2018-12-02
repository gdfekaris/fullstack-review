const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
//   console.log("we're connected!");
// });


mongoose.Promise = require('bluebird');
var promise = mongoose.connect('mongodb://localhost/repoSchema', {
  useMongoClient: true,
});

promise.once('open', function(){
  console.log('Database - opened!')
})


let repoSchema = mongoose.Schema({
  username: String,
  reponame: String,
  repoURL: {type: 'string', unique: true},
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // for reference, see mongoose docs --> https://mongoosejs.com/docs/index.html

  var parsedData = JSON.parse(data);
  console.log('Raw data -->', parsedData);

  for (var i = 0; i < parsedData.length; i++) {
    var newEntry = new Repo({
      username: parsedData[i].owner.login,
      reponame: parsedData[i].name,
      repoURL: parsedData[i].html_url,
    });

    newEntry.save(function (err) {
      if (err) {
        console.log('An error occurred!', err);
      } else {
        console.log('data store successfully in db!!');
      };
    });
  }

}

module.exports.save = save;
//module.exports.find = find;