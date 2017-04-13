//Import dependencies
var auth = require('electron-auth');

//Authentication function
module.exports = function(opt, callback)
{
  //Check the options
  if(typeof opt !== 'object'){ throw new Error('No options provided'); }

  //Check the callback
  if(typeof callback !== 'function'){ throw new Error('No callback function provided'); }


};