// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const port = 3000;
var users = '';
var userProfiles = '';
var request = require("request");
app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));
app.use(express.urlencoded());

/*********  Fetching Users Data **********/
const USERS_URL = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';

fetch(USERS_URL)
    .then(res => res.json())
    .then(json => users = json);

/*********  Fetching Users Data **********/
const USERS_PROFILES_URL = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

fetch(USERS_PROFILES_URL)
    .then(res => res.json())
    .then(json => userProfiles = json);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/contact', (request, response) => {
  /*app.render('contact', {
    data: {},
    errors: {}
  });*/
  response.sendFile(__dirname + '/views/index.html');
  //console.log(userData);
});

//app.post('/contact',checkUserSubmitFnc);
app.post('/contact', (request, response) => {
  
  var postData = JSON.stringify(request.body);
  postData = JSON.parse(postData);
  var resMessage = '';
  //console.log(users);
  //console.log(userProfiles);
   //console.log('key:' + postData.userid);
   var isRegistered = userExists(postData.userid);
   isRegistered == true ? resMessage = 'Child is registered' : resMessage = 'Child is not registered';
  if(isRegistered) {

  }
  response.send(resMessage);
}); 

function userExists(userId) {
  var hasMatch =false;

  for (var index = 0; index < users.length; ++index) {
    var user = users[index];
    if(user.uid == userId){
      hasMatch = true;
      break;
    }
  }
  return hasMatch;
}

  /*app.render('contact', {
    data: req.body, // { message, email }
    errors: {
      message: {
        msg: 'A message is required'
      },
      email: {
        msg: 'That email doesn‘t look right'
      }
    }
  });*/

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
