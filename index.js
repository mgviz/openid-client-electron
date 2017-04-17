//Import dependencies
var auth = require('electron-auth');
var url = require('url');

//Build the provider object
var provider = {};

//Build the authorization url
provider.authorization_url = function(opt, cb)
{
  //Check the client value
  if(typeof opt.client !== 'string' || opt.client.trim() === ''){ return cb(new Error('Client ID not provided'), null); }

  //Build the authorization url
  var auth_url = url.resolve(opt.url, 'authorize?client=' + opt.client + '&' + 'allow_signup=' + opt.allow_signup.toString());

  //Do the callback
  return cb(null, auth_url);
};

//Authorization done
provider.authorization_done = function(opt, new_url, window, cb)
{
  //Get the token value
  var raw_token = /token=([^&]*)/.exec(new_url) || null;

  //Get the real token value
  var token = (raw_token && raw_token.length > 1) ? raw_token[1] : null;

  //Check the token value and do the callback
  if(token){ return cb(null, token); }
};

//Authentication function
var openid = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ throw new Error('No options provided'); }

  //Check the client value
  if(typeof opt.client !== 'string'){ throw new Error('No client ID provided'); }

  //Add the client id
  this._client = opt.client.trim();

  //Add the secret key
  //this._secret = (typeof opt.secret === 'string') ? opt.secret.trim() : '';

  //Add the allow signup value
  this._allow_signup = (typeof opt.allow_signup === 'boolean') ? opt.allow_signup : false;

  //Authorization url
  this._url = (typeof opt.url === 'string') ? opt.url.trim() : 'https://mgviz15w.appspot.com';

  //Return this
  return this;
};

//Do the authentication
openid.prototype.authorize = function(cb)
{
  //Check the callback
  if(typeof cb !== 'function'){ throw new Error('No callback function provided'); }

  //Do the authentication
  return auth(provider, { client: this._client, url: this._url, allow_signup: this._allow_signup }, cb);
};

//Exports to node
module.exports = openid;