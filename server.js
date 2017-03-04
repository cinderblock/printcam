var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var serverStarter = require('server-starter');
var express = require('express');
var app = express();
var server = require('http').Server(app);

var proxyCamUrl = 'http://raspberryprint/webcam/?action=stream';

var proxy = new MjpegProxy(proxyCamUrl);

app.get('/live', proxy.proxyRequest);
app.get('/snap', proxy.snapshot || ((req, res) => {
 res.send('');
}));

app.get('/numberClients', (req, res) => {
  res.send('' + proxy.audienceResponses.length);
});

app.get('/currentBandwidth', (req, res) => {
  res.send('' + proxy.latestBytesPerSec);
});

app.get('/webcam/', (req, res) => {
  if (req.query.action == 'snapshot') {
   res.redirect('/snap');
   return;
  }
  if (req.query.action == 'stream') {
   res.redirect('/live');
   return;
  }
  res.redirect('/');
});

var config = {
 listen: 'printcam.socket',
 socketMode: 0707,
};

serverStarter(server, config, (err, info, extra) => {
  if (err) {
    console.log(err, info, extra);
  } else {
    console.log('Listening:', info);
  }
});
