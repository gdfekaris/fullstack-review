const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  console.log('getReposByUsername function has bee called')
  let options = {
    url: 'https://api.github.com/users/${username}/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(error, response, body) {
      if (error) {
        console.log('There was an error', response.statusCode, error);
      } else {
        console.log('Success!', response.statusCode)
        callback(body);
      }
  })

}

module.exports.getReposByUsername = getReposByUsername;