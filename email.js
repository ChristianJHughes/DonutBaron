//Used tutorial on http://pcarion.com/2015/12/06/gmail-api-node/ to set up email using Gmail API 
var fs = require('fs');
var googleAuth = require('googleapis/node_modules/google-auth-library');
var google = require('googleapis');

function getOAuth2Client(cb) {
    // Load client secrets
    fs.readFile('client_secret.json', function(err, data) {
      if (err) {
        return cb(err);
      }
      var credentials = JSON.parse(data);
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Load credentials
      fs.readFile('gmail-credentials.json', function(err, token) {
        if (err) {
          return cb(err);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          return cb(null, oauth2Client);
        }
      });
    });
  }
  
function sendSampleMail(auth, cb) {
   var gmailClass = google.gmail('v1');

   var email_lines = [];

   email_lines.push('From: <thedonutbaron3@gmail.com>');
   email_lines.push('To: thedonutbaron3@gmail.com');
   email_lines.push('Content-type: text/html;charset=iso-8859-1');
   email_lines.push('MIME-Version: 1.0');
   email_lines.push('Subject: Your Donut Day');
   email_lines.push('');
   email_lines.push('Just a reminder that tomorrow is your donut day!<br/>');
   email_lines.push('<b>-The Donut Baron</b>');

   var email = email_lines.join('\r\n').trim();

   var base64EncodedEmail = new Buffer(email).toString('base64');
   base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

   gmailClass.users.messages.send({
     auth: auth,
     userId: 'me',
     resource: {
       raw: base64EncodedEmail
     }
   }, cb);
 }
 
getOAuth2Client(function(err, oauth2Client) {
    if (err) {
      console.log('err:', err);
    } else {
      sendSampleMail(oauth2Client, function(err, results) {
        if (err) {
          console.log('err:', err);
        } else {
          console.log(results);
        }
      });
    }
  });