const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("we're connected!");
});

let repoSchema = mongoose.Schema({
  id: Number,
  username: String,
  ownerUrl: String,
  repoName: String,
  repoUrl: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, data) => {
  // for reference, see mongoose docs --> https://mongoosejs.com/docs/index.html

  var newEntry = new Repo({
    id: data[0].id,
    username: data[0].owner.login,
    ownerUrl: data[0].owner.url,
    repoName: data[0].name,
    repoUrl: data[0].html_url,
  });

  newEntry.save(function (err) {
    if (err) {
      console.log('An error occurred!', err);
    } else {
      console.log('data store successfully in db!!');
    };
  });
}

module.exports.save = save;