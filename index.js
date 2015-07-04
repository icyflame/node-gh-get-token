module.exports = function (config_obj, cb) {
  /* keys in config_obj
  	* scopes : Array
  	* note : OAuth Token Note
  	* note_url : OAuth Token Note URL
  	* client_id : OAuth client ID
  	* client_secret : OAuth client secret
  	* single_auth : Default => true
  	*/
  var clc = require('cli-color');

  var SINGLE_AUTH = false;
  var CLIENT_INFO = false;
  var NOTE_INFO = false;

  if (config_obj.client_id && config_obj.client_secret) {
    CLIENT_INFO = true;
  }

  if (config_obj.note) {
    NOTE_INFO = true;
  }

  if (!NOTE_INFO && !CLIENT_INFO) {
    console.log(clc.red('This authentication cannot be performed.'));
    console.log('You must provide either Note or the Client ID and Secret Key.');
    return;
  }

  if (NOTE_INFO && !CLIENT_INFO) {
    SINGLE_AUTH = true;
  }

  if (CLIENT_INFO) {
    SINGLE_AUTH = config_obj.single_auth;
  }

  console.log(clc.blue('Welcome to the one-time-authentication module.'));
  console.log('This module will take your github username and password\nand exchange it for an OAuth token');

  var username, password;

  var read = require('read');
  var request = require('request-json');

  read({
    prompt: 'Enter your GitHub username: '

  }, function (err, result, isDef) {
    if (err) {
      console.log(require('util').inspect(err, { depth: null }));
    }
    username = result;

    read({
      prompt: 'Enter your GitHub password: ',
      silent: true

    }, function (err, result, isDef) {
      if (err) {
        console.log(require('util').inspect(err, { depth: null }));
      }
      password = result;
      var client = request.createClient('https://api.github.com/');
      client.setBasicAuth(username, password);

      var data = {
        'scopes': config_obj.scopes,
        'note': config_obj.note,
        'note_url': config_obj.note_url,
        'client_id': config_obj.client_id,
        'client_secret': config_obj.client_secret
      };

      if (SINGLE_AUTH) {
        // console.log("Entered single auth!")

        client.post('authorizations', data, function (err, res, body) {
          if (res.statusCode === 201 && !err) {
            console.log(clc.green('New token created!'));
            console.log('Visit https://github.com/settings/tokens in your browser to revoke access.');
            console.log(body.token);
            return cb(null, body.token);
          } else {
            console.log('HTTP Status Code: ' + res.statusCode);
            console.log('We encountered an error in authentication!');
            return cb(err, undefined);
          }
        });
      } else {
        // console.log("Entered get-or-create auth!")

        client.put('authorizations/clients/' + config_obj.client_id, data, function (err, res, body) {
          if (res.statusCode === 201 && !err) {
            console.log(clc.green('New token created!'));
            console.log('Visit https://github.com/settings/developers in your browser to revoke access.');
            return cb(null, body.token);
          } else if (res.statusCode === 200 && !err) {
            console.log(clc.green('Existing token returned!'));
            console.log('Visit https://github.com/settings/developers in your browser to revoke access.');
            return cb(null, body.token);
          } else {
            console.log('HTTP Status Code: ' + res.statusCode);
            console.log('We encountered an error in authentication!');
            return cb(err, undefined);
          }
        });
      }
    });
  });

};
