//Import dependencies
var auth = require('electron-auth');

//Authentication function
var openid = function(opt, callback)
{
  //Check the options
  if(typeof opt !== 'object'){ throw new Error('No options provided'); }

  //Check the callback
  if(typeof callback !== 'function'){ throw new Error('No callback function provided'); }

  //Do the authentication
  return auth(openid._provider, opt, callback);
};

//Authorization url
openid.url = 'https://mgviz15w.appspot.com/authorize?';

//Provider object
openid._provider = {};

//Build the authorization url
openid._provider.authorization_url = function(opt, cb)
{
  //Check the client value
  if(typeof opt.client !== 'string'){ return cb(new Error('Client ID not provided'), null); }

  //Check the allow signup value
  if(typeof opt.allow_signup !== 'boolean'){ opt.allow_signup = false; }

  //Build the authorization url
  return openid.url + 'client=' + opt.client + '&' + 'allow_signup=' + opt.allow_signup.toString();
};

//Authorization done
openid._provider.authorization_done = function(opt, url, window, cb)
{
  //Get the token value
  var raw_token = /token=([^&]*)/.exec(url) || null;

  //Get the real token value
  var token = (raw_token && raw_token.length > 1) ? raw_token[1] : null;

  //Check the token value and do the callback
  if(token){ return cb(null, token); }
};

//Exports to node
module.exports = openid;