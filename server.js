var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var serverStarter = require('server-starter');
var express = require('express');
var app = express();

var proxyCamUrl = 'http://raspberryprint/webcam/?action=stream';

var proxy = new MjpegProxy(proxyCamUrl);

app.get('/live', proxy.proxyRequest);

var config = {
 listen: 'printcam.socket',
};

serverStarter(app, config);
