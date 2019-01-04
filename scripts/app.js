import http from 'http'
var nodemailer=require('nodemailer');
var http = require('http');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(8080);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anikal2001@gmail.com',
      pass: 'pitabread1'
    }
  });
  
  var mailOptions = {
    from: 'anikal2001@gmail.com',
    to: 'savitakl@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });