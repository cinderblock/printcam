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
  res.send(proxy.audienceResponses.length);
});

var config = {
 listen: 'printcam.socket',
 socketMode: 0707,
};

serverStarter(server, config, addr => {
 console.log(addr);
});
