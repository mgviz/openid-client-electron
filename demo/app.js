//Import dependencies
var app = require('electron').app;
var auth = require('../index.js');

//App ready
app.on('ready', function()
{
  //Initialize the authentication
  return auth({ client: '' }, function(error, token)
  {
    //Check the error
    if(error){ console.log(error.message); }

    //Display the token
    console.log(token);
  });
});